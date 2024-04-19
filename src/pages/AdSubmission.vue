<template>
    <section>
        <div class="container-fluid form-container">

            <div class="container-fluid items-container">
                <span>SUBMIT AN AD</span>
                <form class="form-items">
                    <div class="left-side">
                        <div class="form-control title-input">
                            <label class="top-label" for="title">TITLE</label>
                            <input type="text" id="title">
                        </div>
                        <div class="form-control adoption-checkbox">
                            <label for="adoptable">FOR ADOPTION</label>
                            <input type="checkbox" id="adoptable" v-model="isChecked">

                            <div v-if="!isChecked" class="price-input">
                                <label class="price-label" for="price">PRICE</label>
                                <input type="number" id="price">
                                <label class="euro" for="price">€</label>

                            </div>
                        </div>

                        <div class="form-control type-dropdown">
                            <label for="type">TYPE OF ANIMAL</label>
                            <select id="type" v-model="animalType">
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                            </select>
                        </div>

                        <div class="form-control gender-dropdown">
                            <label for="gender">GENDER</label>
                            <select id="gender" v-model="animalGender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                    </div>

                    <div class="right-side">
                        <div class="form-control age-input">
                            <label class="top-label" for="age">AGE</label>
                            <input type="number" id="age">
                            <label class="months-checkbox" for="age">Months</label>
                            <input type="checkbox" id="months" @click="handleCheckboxClick('months')">
                            <label class="years-checkbox" for="age">Years</label>
                            <input type="checkbox" id="years" @click="handleCheckboxClick('years')">
                        </div>

                        <div class="form-control desc-input">
                            <label class="top-label" for="description">DESCRIPTION</label>
                            <textarea type="text" id="description" rows="4" cols="40"></textarea>
                        </div>

                        <div class="form-control location-input">
                            <label class="top-label" for="location">LOCATION</label>
                            <input type="text" id="location">
                        </div>
                    </div>
                </form>

                <div class="form-background">
                    <img src="/background.jpg">
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isChecked: false,
            animalType: 'cat',
            animalGender: 'male'
        }
    },

    methods: {
        handleCheckboxClick(checkbox) {
            if (checkbox === 'months') {
                document.getElementById('years').checked = false;
            } else if (checkbox === 'years') {
                document.getElementById('months').checked = false;
            }
        }
    }

}
</script>

<style>
.items-container {
    display: grid;
    align-self: flex-start;
}

.form-items {
    display: flex;
    flex-direction: row;
    padding-left: 50px;
    padding-bottom: 50px;
}

.left-side {
    grid-area: 1/1/4/2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 40px;
    margin-right: 60px;
    padding-bottom: 6px;
    flex-direction: column;
    /*row start / column start / row end / column end*/
}

.right-side {
    grid-area: 1/2/3/3;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    margin-right: 40px;
    flex-direction: column;
}

.form-background {

    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    grid-area: 1/2/3/4;

}

.form-control {
    border: none !important;
    outline: none !important;
}

label {
    font-family: 'Roboto Condensed';
    font-weight: bold;
}

input,
textarea {
    outline: none;
    border: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    /* Remove the default arrows */
    margin: 0;
    /* Optional: If you want to remove the space where the arrows were */
}

input[type="checkbox"] {

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    /* Set the size of the checkbox */
    width: 20px;
    height: 20px;
    /* Set the desired background color of the checkbox */
    background-color: #ccc;
    /* Add some padding to visually separate the checkbox from its label */
    margin-right: 5px;
    /* Position the checkbox relative to its container */
    position: relative;
    /* Add a border-radius to round the checkbox */
    border-radius: 6px;
    /* Add a border to give the checkbox a border */
    border: 2px solid #5b5959;
    vertical-align: middle;
}

input[type="checkbox"]:checked::before {
    /* Change the background color of the checkbox when checked */

    /* Change this to your desired color */
    /* Add a content to create the checkmark */
    content: "\2713";
    /* Unicode checkmark character */
    /* Position the checkmark in the center of the checkbox */
    position: absolute;
    top: 50%;
    left: 50%;
    /* Center the checkmark */
    transform: translate(-50%, -50%);
    /* Set the color of the checkmark */
    color: rgb(0, 0, 0);
    font-size: 15px;
    font-weight: bold;
}

.top-label {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    padding-left: 10px;
}

.title-input {
    display: flex;
    flex-direction: column;
    border: none;
    margin: 30px;
}

#title {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
}

.adoption-checkbox {
    display: flex;
    align-items: center;
    border: none;
    margin: 30px;
}

#adoptable,
#months,
#years {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;

}

#price {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 50px;
    border-radius: 5px;
    width: 100px;
}

input[price]:focus {
    font-family: 'Roboto Condensed';
    outline: none;

}

.price-input {
    position: relative;
    margin-top: 10px;
}

.price-label {
    position: absolute;
    top: 0;
    /* Adjust as needed */
    left: 0;
    /* Adjust as needed */
    width: 20px;
}

.euro {
    font-size: large;
    padding-left: 5px;
}

.type-dropdown {
    border: none;
    margin: 30px;
}

#type {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
}

.gender-dropdown {
    border: none;
    margin: 30px;
}

#gender {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
}

.age-input {
    border: none;
    margin: 30px;

}

#age {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
    width: 100px;
}

.months-checkbox,
.years-checkbox {
    padding-left: 10px;
}

.desc-input {
    border: none;
    margin: 30px;
}

#description {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
}

.location-input {
    border: none;
    margin: 30px;
}

#location {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
}

span {
    font-weight: bold;
    font-family: 'Roboto Condensed';
    font-size: xx-large;
    margin-left: 30%;
    margin-top: 20px;
}

option,
select {
    font-family: 'Roboto Condensed';

}
</style>