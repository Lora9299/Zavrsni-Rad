<template>
    <section>

        <div class="container item-container p-3">
            <div class="item item-1">
                <img class="img-fluid img-responsive rounded product-image" src="/paw.png">
            </div>
            <div class=" item item-2">

                <h4 class="ms-5 item-title border-bottom"> <router-link :to="itemDetailsLink"
                        class="title-link">{{ title }}</router-link>
                </h4>

                <li class="content">
                    <h5>{{ type }}</h5>
                    <h5>Breed: <span class="prop-text">{{ breed }}</span></h5>
                    <h5>Age: <span class="prop-text">{{ age }}</span> </h5>
                    <h5 class="item-price">$ {{ price }}</h5>
                </li>
            </div>
            <div class="item item-3">
                <div class="buttons">
                    <router-link :to="itemDetailsLink" class="btn btn-secondary btn-sm">VIEW</router-link>
                    <button class="btn btn-outline-secondary btn-sm mt-2" type="button">Favorite</button>
                </div>
            </div>
        </div>


    </section>
</template>

<script>
export default {
    props: ['id', 'title', 'type', 'breed', 'age', 'price'],
    computed: {
        itemDetailsLink() {
            return '/pet/' + this.id;
        }
    }
}
</script>

<style>
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
    /* Ensure content doesn't overflow rounded corners */
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
    padding-left: 200px;
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
:visited {
    color: grey;
}

.prop-text {
    font-weight: lighter;
}

.item-price {

    font-size: 35px;
    padding-left: 200px;

}

.buttons {
    display: flex;
    flex-direction: column;
    padding-left: 31%;
}

.buttons button,
.buttons a {
    width: 250%;
    /* Make buttons wider */
    margin-bottom: 15px;
    /* Add some space between buttons */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>