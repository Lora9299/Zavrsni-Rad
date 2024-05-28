<template>
    <div class="containter carousel-container">

        <div id="homeCarousel" class="carousel carousel-dark slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            </div>

            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                    <img src="catanddog.png" class="d-block w-100 overlay-image" alt="...">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Sign up to submit an ad</h5>
                        <p>Sell or put an animal up for adoption today.</p>
                        <router-link to="/sign-up" class="btn btn-md btn-secondary">Sign up today</router-link>
                    </div>
                </div>
                <div class="carousel-item position-relative">
                    <img src="Animals.jpg" class="d-block w-100" alt="...">
                    <div class="carousel-caption d-none d-md-block position-absolute top-0 start-50 translate-middle-x">
                        <h5>Looking for a new pet?</h5>
                        <p>Check out our <router-link to="/cats" class="pet-link">Cats</router-link> and <router-link
                                to="/dogs" class="pet-link">Dogs</router-link>.</p>
                    </div>
                </div>
            </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

    </div>
</template>

<style scoped>
.carousel-container {
    margin: 35px 0;
}

.overlay-image {
    background-position: center;
    background-size: cover;
    opacity: 0.95;
}

.pet-link {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
}

.pet-link:hover {
    color: grey;
}
</style>
