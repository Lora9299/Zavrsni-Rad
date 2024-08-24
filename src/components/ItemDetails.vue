<template>
    <div v-if="selectedItem" class="container-fluid">
        <div class="d-flex justify-content-center row">
            <div class="col-sm-1"></div>
            <div class="col d-flex justify-content-center align-items-center">
                <div id="carouselExampleIndicators" class="carousel slide">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" v-for="(image, index) in images.slice(1)" :key="index"
                            :data-bs-slide-to="index + 1" :aria-label="'Slide ' + (index + 2)"
                            class="visually-hidden"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active align-items-center align-content-center">
                            <img class="img-fluid rounded product-image" :src="images[0]" alt="Animal Image">
                        </div>
                        <div class="carousel-item align-items-center align-content-center"
                            v-for="(image, index) in images.slice(1)" :key="index">
                            <img :src="image" class="img-fluid rounded product-image" :alt="'Image ' + (index + 2)">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                    <div class="row">
                        <div class="col d-flex justify-content-center flex-wrap">
                            <div v-for="(image, index) in images" :key="index" class="thumbnail-wrapper m-2">
                                <img :src="image" class="img-thumbnail" :alt="'Image ' + (index + 1)">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-7">
                <div class="advertisement-container">
                    <h1 class="title text-uppercase">{{ title }}</h1>
                    <div class="price" v-if="price !== null">€{{ price }}</div>
                    <div class="adoption" v-else>FOR ADOPTION</div>
                    <div class="details">
                        <div class="detail-item">
                            <span class="breed-label">BREED</span>
                            <span class="breed-value">
                                <p>{{ breed }}</p>
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="age-label">AGE</span>
                            <span class="age-value">
                                <p v-if="years">{{ age }} YEARS</p>
                                <p v-else>{{ age }} MONTHS</p>
                            </span>
                        </div>
                    </div>
                    <div class="description">DESCRIPTION</div>
                    <div class="description-card">{{ description }}</div>
                    <div class="footer">
                        <div class="location">
                            <span class="icon">
                                <font-awesome-icon icon="fa-map-marker-alt" class="location-marker" />
                            </span>
                            <span class="text">{{ location }}</span>
                        </div>
                        <div class="separator"></div>
                        <div class="contact">CONTACT: <font-awesome-icon icon="fa-phone" class="icon" /> {{ contact }}
                        </div>
                        <div class="uploader">UPLOADER:</div>
                        <button class="profile-button" @click="showProfileCard = true">
                            {{ uploaderUsername }}</button>
                        <profile-card :show="showProfileCard" :title="profileTitle" class="profile-title"
                            @close="showProfileCard = false">
                            <div class="profile-content">
                                <div class="profile-picture-container">
                                    <div class="profile-picture">
                                        <img v-if="profilePicture" :src="profilePicture" alt="Profile Picture" />
                                    </div>
                                </div>
                                <div class="profile-data">
                                    <div class="data"> <font-awesome-icon icon="user"
                                            class="icon" />{{ uploaderUsername }}</div>
                                    <span class="horizontal-line"></span>
                                    <div class="data"> <font-awesome-icon icon="fa-envelope" class="icon" />{{ email }}
                                    </div>
                                    <span class="horizontal-line"></span>
                                    <div class="data"> <font-awesome-icon icon="fa-phone" class="icon" />{{ contact }}
                                    </div>
                                    <span class="horizontal-line"></span>
                                    <div class="data"> <font-awesome-icon icon="fa-map-marker-alt"
                                            class="location-marker" /> {{ location }}</div>
                                </div>
                            </div>
                        </profile-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="spinner-container">
        <base-spinner></base-spinner>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProfileCard from '../components/ProfileCard.vue';

export default {
    props: ['id'],
    data() {
        return {
            selectedItem: null,
            uploader: null,
            showProfileCard: false,
        };
    },

    components: {
        ProfileCard
    },

    computed: {
        ...mapGetters('animals', {
            getAnimalById: 'getAnimalById'
        }),
        routeId() {
            return this.$route.params.id;
        },
        title() {
            return this.selectedItem ? this.selectedItem.title : '';
        },
        price() {
            return this.selectedItem ? this.selectedItem.price : '';
        },
        description() {
            return this.selectedItem ? this.selectedItem.description : '';
        },
        breed() {
            return this.selectedItem ? this.selectedItem.breed : '';
        },
        age() {
            return this.selectedItem ? this.selectedItem.age : '';
        },
        years() {
            return this.selectedItem ? this.selectedItem.years : false;
        },
        location() {
            return this.selectedItem ? this.selectedItem.location : '';
        },
        contact() {
            return this.selectedItem ? this.selectedItem.contact : '';
        },
        images() {
            return this.selectedItem && this.selectedItem.images.length
                ? this.selectedItem.images
                : ['/paw.png'];
        },


        uploaderUsername() {
            return this.uploader ? this.uploader.username : "";
        },
        email() {
            return this.uploader ? this.uploader.email : "";
        },
        profilePicture() {
            return this.uploader && this.uploader.profilePicture ? this.uploader.profilePicture : '';
        },
        profileTitle() {
            return this.uploader ? this.uploader.username + "'s profile" : "Profile";
        }
    },

    methods: {
        async fetchAnimal(id) {
            let animal = this.getAnimalById(id);
            if (!animal) {
                console.log('Animal not found in store, loading animals from Firestore...');
                await this.$store.dispatch('animals/loadAnimals');
                animal = this.getAnimalById(id);
            }
            if (animal) {
                this.selectedItem = animal;
                console.log('Fetched animal:', this.selectedItem);
                if (animal.userId) {
                    console.log('Animal has userId:', animal.userId);
                    await this.fetchUploader(animal.userId);
                } else {
                    console.error('Animal does not have a userId');
                }
            } else {
                console.error('Animal not found after loading from Firestore.');
            }
        },
        async fetchUploader(userId) {
            try {
                console.log('Fetching uploader with ID:', userId);
                const userData = await this.fetchUserById(userId);
                this.uploader = userData;
                console.log('Fetched uploader:', this.uploader);
            } catch (error) {
                console.error('Error fetching uploader:', error);
            }
        },
        ...mapActions('users', ['fetchUserById']),
    },

    watch: {
        routeId(newId) {
            console.log('Route ID has changed:', newId);
            if (newId) {
                this.fetchAnimal(newId);
            }
        },
    },

    created() {
        if (this.routeId) {
            this.fetchAnimal(this.routeId);
        } else {
            console.error('Route ID is undefined on created');
        }
    },
};
</script>

<style scoped>
.container-fluid {
    min-height: 90vh;
    padding-top: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
}

.carousel-item {
    height: 33rem;
    background: #ececec;
    position: relative;
    border-radius: 8px;
    margin-top: 10px;
    margin-bottom: 20px;
}

.carousel-indicators {
    display: none;
}

.thumbnail-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}

.img-thumbnail {
    max-width: 90px;
    max-height: 90px;
    object-fit: cover;
    margin: 4px;

}

.img-thumbnail:focus {
    max-width: 110px;
    max-height: 110px;
}

.product-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: center;
}

.title {
    font-size: 2.4em;
    padding-bottom: 40px;
}

.price {
    font-weight: bold;
    font-size: 3em;
    margin-bottom: 20px;
    color: #5b725b;
}

.adoption {
    font-weight: bold;
    font-size: 2em;
    padding-top: 20px;
    margin-bottom: 10px;
    color: #5b725b;
}

.advertisement-container {
    width: 800px;
    min-height: 650px;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 40px;
    margin-top: 30px;
}

.details {
    display: flex;
    justify-content: space-between;
    padding-top: 40px;
}

.detail-item {
    text-align: left;
}

.breed-label {
    font-weight: bold;
    font-size: 1.4em;
    padding-left: 80px;
}

.breed-value p {
    margin-left: 80px;
    margin-top: 5px;
    font-size: 2em;
    text-transform: uppercase;
}

.age-label {
    font-weight: bold;
    font-size: 1.4em;
    padding-right: 160px;
}

.age-value p {
    margin-top: 5px;
    font-size: 2em;
    font-weight: 400;
}

.description {
    font-weight: bold;
    font-size: 1.4em;
    margin-top: 20px;
    padding-right: 450px;

}

.description-card {
    margin: 10px 40px;
    height: 135px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: 20px;
    text-align: left;
    color: #555;
}

.footer {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.location {
    display: flex;
    font-size: 1.2em;
    margin-left: 50px;
    align-items: center;
}

.location-marker {
    color: rgb(226, 56, 56);
    font-size: 25px;
    margin-right: 10px;
}

.icon {
    font-size: 20px;
    margin-right: 5px;
}

.contact {
    font-size: 1.2em;
    font-weight: bold;
}

.separator {
    width: 1px;
    height: 50px;
    background-color: #ddd;
    margin: 0 20px;
}

.carousel-indicators .visually-hidden {
    display: none;
}

.horizontal-line {
    width: 100%;
    height: 1px;
    background-color: #ccccccba;
}

.uploader {
    margin-left: 50px;
}

.profile-button {
    border: none;
    background: none;
    margin-right: 50px;
    font-weight: 600;
    padding: 6px;
}

.profile-button:hover {
    color: #555;
}

.profile-title {
    text-transform: uppercase;
}

.profile-content {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.profile-picture-container {
    display: flex;
    vertical-align: middle;
    justify-content: center;
    width: 100%;
    background-color: rgb(219, 244, 218);
    padding-top: 50px;
    padding-bottom: 50px;
    margin-bottom: 20px;
}

.profile-picture {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background-color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.profile-picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.data {
    padding: 15px;
    display: flex;
    font-weight: 600;
    text-transform: uppercase;
}

.profile-data {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
}
</style>
