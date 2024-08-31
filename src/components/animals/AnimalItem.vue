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
                <li class="content">
                    <h5>Vrsta: <span class="prop-text">{{ breed }}</span></h5>
                    <h5>
                        Dob: <span class="prop-text">{{ age }}
                            <span v-if="months">mjeseca</span>
                            <span v-else-if="years">godina</span>
                        </span>
                    </h5>
                    <h5 class="item-price" v-if="price !== null">€ {{ price }}</h5>
                </li>
            </div>
            <div class="item item-3">
                <div class="buttons">
                    <router-link :to="itemDetailsLink" class="btn btn-secondary btn-sm">PREGLEDAJ</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: ['id'],
    computed: {
        ...mapGetters('animals', {
            getAnimalById: 'getAnimalById'
        }),

        itemDetailsLink() {
            return '/pet/' + this.id;
        },

        item() {
            return this.getAnimalById(this.id);
        },

        title() {
            return this.item ? this.item.title : '';
        },
        breed() {
            return this.item ? this.item.breed : '';
        },
        age() {
            return this.item ? this.item.age : '';
        },
        price() {
            return this.item ? this.item.price : '';
        },
        months() {
            return this.item ? this.item.months : '';
        },
        years() {
            return this.item ? this.item.years : '';
        },
        images() {
            return this.item && this.item.images && this.item.images.length ? this.item.images : ['/paw.png'];
        }
    }
}
</script>

<style scoped>
ul {
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
    /*row start / column start / row end / column end*/
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
    padding-left: 400px;
    padding-top: 25px;
}

h5 {
    padding: 6px;
}

.item-title {
    position: absolute;
    top: 0;
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
    font-size: 40px;
    margin-top: 25px;
    padding-left: 40px;
}

.buttons {
    display: flex;
    flex-direction: column;
    padding-left: 40%;
}

.buttons button,
.buttons a {
    width: 150%;
    margin-bottom: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>