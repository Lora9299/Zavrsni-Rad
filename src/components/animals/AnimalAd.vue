<template>
    <section>
        <div class="container item-container p-3">
            <div class="item item-1">
                <img v-if="images.length && images[0] !== '/paw.png'"
                    class="img-fluid img-responsive rounded product-image" :src="images[0]">
                <img v-else class="img-fluid img-responsive rounded product-image" src="/paw.png" alt="No Images">
            </div>
            <div class="item item-2">
                <h4 class="ms-5 item-title border-bottom">
                    <router-link :to="itemDetailsLink" class="title-link">{{ title }}</router-link>
                </h4>
                <ul class="content">
                    <li>
                        <h5>Breed: <span class="prop-text">{{ breed }}</span></h5>
                    </li>
                    <li v-if="price !== null">
                        <h5 class="item-price">€ {{ price }}</h5>
                    </li>
                </ul>
            </div>
            <div class="item item-3">
                <div class="buttons">
                    <router-link :to="itemDetailsLink" class="btn btn-secondary btn-sm">VIEW</router-link>
                    <button @click="editAd" class="btn btn-outline-secondary btn-sm mt-2" type="button">EDIT</button>
                </div>
                <div class="delete-button">
                    <button @click="showDeleteDialog" class="btn-delete">
                        <font-awesome-icon class="trash-icon" :icon="['fas', 'trash-can']" />
                    </button>
                </div>
            </div>
        </div>
        <base-dialog :show="isDialogVisible" title="Confirm Delete" @close="isDialogVisible = false">
            <template #default>
                <p>Are you sure you want to delete this animal?</p>
            </template>
            <template #actions>
                <base-button @click="confirmDelete">Yes</base-button>
                <base-button @click="isDialogVisible = false">No</base-button>
            </template>
        </base-dialog>
    </section>
</template>

<script>
import { mapActions } from 'vuex';
import BaseDialog from '../BaseDialog.vue';
import BaseButton from '../BaseButton.vue';

export default {
    components: {
        BaseDialog,
        BaseButton,
    },
    props: {
        id: {
            type: [String, Number],
            required: true
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        breed: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            default: null
        },
        price: {
            type: Number,
            default: null
        },
        adoptable: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isDialogVisible: false
        };
    },
    computed: {
        itemDetailsLink() {
            return `/pet/${this.id}`;
        },
        defaultImage() {
            return ['/paw.png'];
        },
        displayedImages() {
            return this.images.length ? this.images : this.defaultImage;
        }
    },
    methods: {
        ...mapActions('animals', ['deleteAnimal']),
        showDeleteDialog() {
            this.isDialogVisible = true;
        },
        async confirmDelete() {
            try {
                await this.deleteAnimal({ id: this.id, type: this.type });
                this.$emit('adDeleted', this.id);
            } catch (error) {
                console.error('Failed to delete the ad:', error);
            } finally {
                this.isDialogVisible = false;
            }
        },
        editAd() {
            const adData = {
                id: this.id,
                title: this.title,
                type: this.type,
                breed: this.breed,
                age: this.age,
                price: this.price,
                adoptable: this.adoptable,
                description: this.description,
                location: this.location,
                contact: this.contact,
                images: this.images
            };
            this.$router.push({
                name: 'AdSubmission',
                query: { adData: JSON.stringify(adData) }
            });
        }
    }
};
</script>

<style scoped>
ul,
li {
    list-style: none;
}

.item-container {
    display: grid;
    grid-template-rows: 100px 100px 100px;
    grid-template-columns: 100px 100px 100px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    margin-top: 25px;
}

.item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    overflow: hidden;
}

.item-1 {
    background-color: #9cc599;
    grid-area: 1/1/4/4;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.item-2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background: white;
    grid-area: 1/3/4/7;
    border-radius: 50px;
    position: relative;
    z-index: 1;
}

.item-3 {
    background-color: #d9e8d8;
    grid-area: 1/6/4/8;
    border-radius: 50px;
    position: relative;
}

.content {
    position: absolute;
    padding-left: 200px;
    padding-top: 25px;
    justify-items: center;
}

.content,
ul {
    margin-left: 120px;
    margin-top: 40px;
}

h5 {
    padding: 6px;
}

.item-title {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
}

.title-link {
    text-decoration: none;
    color: black;
}

.title-link:hover,
.title-link:visited {
    color: grey;
}

.prop-text {
    font-weight: lighter;
}

.item-price {
    font-size: 35px;
}

.buttons {
    display: flex;
    flex-direction: column;
    padding-left: 37%;
}

.buttons button,
.buttons a {
    width: 250%;
    margin-bottom: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.delete-button {
    border: none;
    align-items: center;
    margin-top: 40%;
}

.btn-delete {
    border: none;
    color: inherit;
    padding: 0;
    background: none;
}

.trash-icon {
    color: rgb(191, 56, 56);
    font-size: 1.5rem;
    margin-top: 10px;
}
</style>