<template>
    <div class="container-fluid">
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
                        <div class="carousel-item active">
                            <img class="img-fluid rounded product-image" src="/spaceholder_details.png">
                        </div>
                        <div class="carousel-item">
                            <img src="/dogblue.jpg" class="img-fluid rounded product-image">
                        </div>
                        <div class="carousel-item">
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


            <div class="col-7 align-items-center align-content-center">
                <h4 class="ms-5 text-uppercase">Title</h4>
                <div class="col-md-10 mt-5 border-bottom">
                    <p class="text-start"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut
                        labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est laborum.</p>
                </div>
            </div>

        </div>

    </div>
</template>
