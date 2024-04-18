<template>
    <div class="container-fluid pb-2">
        <div class="d-felx justify-content-center row">
            <div class="col-sm-1"></div>


            <div class="col d-flex justify-content-center align-items-center">
                <div id="carouselExampleIndicators" class="carousel slide">

                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                            class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>

                    <div class="carousel-inner">
                        <div class="carousel-item active align-items-center align-content-center">
                            <img class="img-fluid rounded product-image" src="/spaceholder_details.png">
                        </div>
                        <div class="carousel-item align-items-center align-content-center">
                            <img src="/dogblue.jpg" class="img-fluid rounded product-image">
                        </div>
                        <div class="carousel-item align-items-center align-content-center">
                            <img src="/dog_spaceholder.jpg" class="img-fluid rounded product-image">
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
                <h4 class="ms-5 text-uppercase">{{ title }}</h4>
                <div class="col-md-10 mt-5 border-bottom">
                    <p>{{ price }}</p>
                    <p>{{ age }}</p>
                    <p class="text-start">{{ description }}</p>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
export default {
    props: ['id'],
    data() {
        return {
            selectedItem: null,
            paramId: this.$route.params.id
        };
    },
    computed: {

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
        location() {
            return this.selectedItem ? this.selectedItem.location : '';
        },
        contactLink() {
            return this.$route.path + '/' + this.id + '/contact';
        }
    },

    created() {
        this.selectedItem = this.$store.getters['animals/animals'].find(animal => animal.id === this.paramId);
    },

}
</script>


<style>
.carousel-item {
    height: 34rem;
    background: #ececec;
    position: relative;
    border-radius: 8px;

}

.product-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: center;
}
</style>