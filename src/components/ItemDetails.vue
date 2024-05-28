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
                </div>
            </div>
            <div class="col-7">
                <div class="advertisement-container">
                    <h1 class="title text-uppercase">{{ title }}</h1>
                    <div class="price" v-if="price !== null">${{ price }}</div>
                    <div class="details">
                        <div class="detail-item">
                            <span class="breed-label">BREED:</span>
                            <span class="breed-value">
                                <p>{{ breed }}, {{ gender }}</p>
                            </span>
                        </div>
                        <div class="detail-item">
                            <span class="age-label">AGE:</span>
                            <span class="age-value">
                                <p v-if="years">{{ age }} Years</p>
                                <p v-else>{{ age }} Months</p>
                            </span>
                        </div>
                    </div>
                    <div class="description-card">{{ description }}</div>
                    <div class="footer">
                        <div class="location">
                            <span class="icon">
                                <font-awesome-icon icon="fa-map-marker-alt" class="location-marker" />
                            </span>
                            <span class="text">{{ location }}</span>
                        </div>
                        <div class="separator"></div>
                        <div class="contact">CONTACT: {{ contact }}</div>
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
import { mapGetters } from 'vuex';

export default {
    props: ['id'],
    data() {
        return {
            selectedItem: null,
        };
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
        gender() {
            return this.selectedItem ? this.selectedItem.gender : '';
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
            return this.selectedItem && this.selectedItem.images.length ? this.selectedItem.images : ['/spaceholder_details.png', '/dogblue.jpg', '/dog_spaceholder.jpg'];
        }
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
    methods: {
        async fetchAnimal(id) {
            console.log('Fetching animal with ID:', id);
            let animal = this.getAnimalById(id);
            console.log('Animal fetched from store:', animal);
            if (!animal) {
                console.log('Animal not found in store, loading animals from Firestore...');
                await this.$store.dispatch('animals/loadAnimals');
                animal = this.getAnimalById(id);
            }
            this.selectedItem = animal;
            console.log('Fetched animal:', this.selectedItem);
        },
    },
}
</script>

<style scoped>
.container-fluid {
    height: 88vh;
}

.carousel-item {
    height: 34rem;
    background: #ececec;
    position: relative;
    border-radius: 8px;
    margin-bottom: 60px;
    margin-top: 30px;
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
    padding-bottom: 20px;
}

.price {
    font-weight: bold;
    font-size: 3em;
    margin-top: 30px;
    margin-bottom: 30px;
}

.advertisement-container {
    width: 800px;
    height: 545px;
    padding: 20px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    margin-bottom: 60px;
    margin-top: 30px;
}

.details {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
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
    margin-left: 150px;
    margin-top: 10px;
    font-size: 1.2em;
}

.age-label {
    font-weight: bold;
    font-size: 1.4em;
    padding-right: 150px;
}

.age-value p {
    padding-left: 50px;
    margin-top: 10px;
    font-size: 1.2em;
}

.description-card {
    margin: 0 40px;
    height: 135px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: 20px;
    text-align: left;
    color: #555;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.location {
    display: flex;
    font-size: 1.4em;
    margin-left: 120px;
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
    margin-right: 100px;
    font-size: 1.4em;
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
</style>
