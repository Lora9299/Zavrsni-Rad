<template>
    <section>
        <div class="container-fluid form-container">
            <div class="container-fluid items-container">

                <base-dialog :show="!!error" title="An error occurred" @close="handleError">
                    <p>{{ error }}</p>
                </base-dialog>
                <base-dialog :show="isLoading" title="Loading..." fixed>
                    <base-spinner></base-spinner>
                </base-dialog>

                <span class="submit-title">SUBMIT AN AD</span>
                <form class="form-items" @submit.prevent="submitForm">
                    <div class="left-side">
                        <div class="form-control title-input" :class="{ invalid: !title.isValid }">
                            <label class="top-label" for="title">TITLE</label>
                            <input type="text" id="title" v-model.trim="title.val" @blur="clearValidity('title')">
                            <p v-if="!title.isValid">Title can't be empty.</p>
                        </div>
                        <div class="form-control adoption-checkbox">
                            <label for="adoptable">FOR ADOPTION</label>
                            <input type="checkbox" id="adoptable" v-model="adoptable.val">
                        </div>
                        <div v-if="!adoptable.val" class="form-control price-input">
                            <label class="price-label" for="price">PRICE</label>
                            <input type="number" id="price" v-model.number="price.val">
                            <label class="euro" for="price">€</label>
                        </div>
                        <div class="form-control type-dropdown">
                            <label for="type">TYPE OF ANIMAL</label>
                            <select id="type" v-model="type.val">
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                            </select>
                        </div>
                        <!-- <div class="form-control gender-dropdown">
                            <label for="gender">GENDER</label>
                            <select id="gender" v-model="gender.val">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div> -->
                        <div class="form-control breed-input" :class="{ invalid: !breed.isValid }">
                            <label class="top-label" for="breed">BREED</label>
                            <input type="text" id="breed" v-model.trim="breed.val" @blur="clearValidity('breed')">
                            <p v-if="!breed.isValid">Breed can't be empty.</p>
                        </div>
                    </div>
                    <div class="right-side">
                        <div class="form-control age-input" :class="{ invalid: !age.isValid }">
                            <label class="top-label" for="age">AGE</label>
                            <input type="number" id="age" v-model.number="age.val" @blur="clearValidity('age')">
                            <label class="months-checkbox" for="age" value="months">Months</label>
                            <input type="checkbox" id="months" @change="handleCheckboxClick('months')"
                                v-model="months.val">
                            <label class="years-checkbox" for="age" value="years">Years</label>
                            <input type="checkbox" id="years" @change="handleCheckboxClick('years')"
                                v-model="years.val">
                            <p v-if="!age.isValid">Age can't be empty.</p>
                        </div>
                        <div class="form-control desc-input" :class="{ invalid: !description.isValid }">
                            <label class="top-label" for="description">DESCRIPTION </label>
                            <textarea type="text" id="description" rows="4" cols="40" v-model.trim="description.val"
                                @blur="clearValidity('description')"></textarea>
                            <p v-if="!description.isValid">Description can't be empty.</p>
                        </div>
                        <div class="form-control location-input" :class="{ invalid: !location.isValid }">
                            <label class="top-label" for="location">LOCATION</label>
                            <input type="text" id="location" v-model.trim="location.val"
                                @blur="clearValidity('location')">
                            <p v-if="!location.isValid">Location can't be empty.</p>
                        </div>
                        <div class="form-control" :class="{ invalid: !contact.isValid }">
                            <label class="top-label" for="contact">CONTACT</label>
                            <input type="text" id="contact" v-model.trim="contact.val" @blur="clearValidity('contact')">
                            <p v-if="!contact.isValid">Contact can't be empty.</p>
                        </div>
                        <div class="form-control img-input">
                            <label class="image-input" for="image">ADD IMAGES</label>
                            <input type="file" id="image" class="input-file" ref="image" @change="handleImageChange"
                                multiple>
                            <button class="custom-file-button" @click.prevent="$refs.image.click()">UPLOAD
                                IMAGES</button>
                        </div>
                    </div>
                    <div class="submit-container">
                        <button class="submit-btn" :disabled="isLoading">SUBMIT</button>
                    </div>
                    <div class="invalid-form">
                        <p v-if="!formIsValid"> Please make sure you've entered/checked everything. </p>
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
import { mapActions, mapGetters } from 'vuex';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default {
    data() {
        return {
            isLoading: false,
            adoptable: { val: false, isValid: true },
            type: { val: 'cat', isValid: true },
            // gender: { val: 'male', isValid: true },
            title: { val: '', isValid: true },
            price: { val: null, isValid: true },
            age: { val: null, isValid: true },
            months: { val: false, isValid: true },
            years: { val: false, isValid: true },
            description: { val: '', isValid: true },
            location: { val: '', isValid: true },
            breed: { val: '', isValid: true },
            contact: { val: '', isValid: true },
            images: { val: [], isValid: true },
            formIsValid: true,
            adData: null,
        };
    },
    computed: {
        ...mapGetters(['user']),

        isEditMode() {
            return !!this.adData;
        }
    },
    methods: {
        ...mapActions('animals', ['addAnimal', 'updateAnimal']),
        handleImageChange(event) {
            const files = Array.from(event.target.files);
            const newImages = files.map(file => ({
                name: file.name,
                size: file.size,
                type: file.type,
                file: file,
            }));
            this.images.val = [...this.images.val.filter(img => img.url), ...newImages];
            this.images.isValid = true;
        },
        handleCheckboxClick(checkbox) {
            if (checkbox === 'months' && this.months.val) {
                this.years.val = false;
            } else if (checkbox === 'years' && this.years.val) {
                this.months.val = false;
            }
        },
        clearValidity(input) {
            this[input].isValid = true;
        },
        validateForm() {
            this.formIsValid = true;
            if (this.title.val === '') this.title.isValid = false;
            if (this.breed.val === '') this.breed.isValid = false;
            if (!this.adoptable.val && (!this.price.val || this.price.val < 0)) this.price.isValid = false;
            if (!this.age.val || this.age.val < 0) this.age.isValid = false;
            if (this.description.val === '') this.description.isValid = false;
            if (this.location.val === '') this.location.isValid = false;
            if (this.contact.val === '') this.contact.isValid = false;

            this.formIsValid = this.title.isValid && this.breed.isValid && this.price.isValid && this.age.isValid &&
                this.description.isValid && this.location.isValid && this.contact.isValid;
        },
        submitForm() {
            this.validateForm();
            if (this.formIsValid) {
                this.isLoading = true;
                const auth = getAuth();
                const user = auth.currentUser;

                const ad = {
                    userId: user.uid,
                    title: this.title.val,
                    type: this.type.val,
                    // gender: this.gender.val,
                    breed: this.breed.val,
                    price: this.price.val,
                    age: this.age.val,
                    months: this.months.val,
                    years: this.years.val,
                    description: this.description.val,
                    location: this.location.val,
                    contact: this.contact.val,
                    images: this.images.val.map(image => image.url ? { url: image.url } : image),
                    adoptable: this.adoptable.val,
                };

                if (this.isEditMode) {
                    ad.id = this.adData.id;
                    this.updateAnimal(ad)
                        .then(() => {
                            const redirectUrl = ad.type === 'cat' ? '/cats' : '/dogs';
                            this.$router.push(redirectUrl);
                        })
                        .catch(err => {
                            this.error = err.message || 'Failed to update the ad.';
                            this.isLoading = false;
                        });
                } else {
                    this.addAnimal(ad)
                        .then(() => {
                            const redirectUrl = ad.type === 'cat' ? '/cats' : '/dogs';
                            this.$router.push(redirectUrl);
                        })
                        .catch(err => {
                            this.error = err.message || 'Failed to submit the ad.';
                            this.isLoading = false;
                        });
                }
            }
        },
        handleError() {
            this.error = null;
        },
        fetchUserData() {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const db = getFirestore();
                const docRef = doc(db, "users", user.uid);
                getDoc(docRef).then(docSnap => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        this.contact.val = userData.contact || '';
                        this.location.val = userData.location || '';
                    }
                }).catch(error => {
                    console.error("Error fetching user data:", error);
                });
            }
        }
    },
    created() {
        this.fetchUserData();
    }

};
</script>


<style scoped>
.items-container {
    display: grid;
    align-self: flex-start;
    justify-content: center;

}

.submit-title {
    padding-left: 55px;
    margin-bottom: 20px;
}

.form-items {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    padding-bottom: 40px;
}

.left-side {
    grid-area: 1/1/3/2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    flex-direction: column;
    /*row start / column start / row end / column end*/
}

.right-side {
    grid-area: 1/2/3/3;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    flex-direction: column;
}

.form-background {

    display: flex;
    justify-content: flex-end;
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
    margin: 0;
}

input[type="checkbox"] {

    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    background-color: #ccc;
    margin-right: 5px;
    position: relative;
    border-radius: 6px;
    border: 2px solid #5b5959;
    vertical-align: middle;
}

input[type="checkbox"]:checked::before {
    content: "\2713";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(0, 0, 0);
    font-size: 15px;
    font-weight: bold;
}

input[type="checkbox"]:hover {
    cursor: pointer;
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
    margin: 10px;
}

#title {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
    margin-right: 40px;
}

.adoption-checkbox {
    display: flex;
    align-items: center;
    border: none;
    margin: 10px;
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
    margin-left: 50px;
    border-radius: 5px;
    width: 100px;
}

input[price]:focus {
    font-family: 'Roboto Condensed';
    outline: none;
}

.price-input {
    margin-top: 10px;
}

.price-label {
    width: 20px;
}

.euro {
    font-size: large;
    padding-left: 5px;
}

.type-dropdown {
    border: none;
    margin: 20px;
}

#type {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 20px;
    border-radius: 5px;
}

.gender-dropdown {
    border: none;
    margin: 20px;
}

label[for="gender"],
label[for="type"],
label[for="adoptable"],
label[for="price"] {
    padding-left: 10px;
}

#gender {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 20px;
    border-radius: 5px;
}

.breed-input {
    margin: 5px;
}

#breed {
    background-color: rgb(233, 232, 232);
    border-radius: 5px;
    margin-left: 10px;
    width: 290px;

}

.age-input {
    border: none;
    margin: 10px;
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

/*.desc-input {
    border: none;
}*/

#description {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
}

.location-input {
    border: none;
    margin: 10px;
}

#location {
    background-color: rgb(233, 232, 232);
    border: none;
    margin-left: 10px;
    border-radius: 5px;
    width: 290px;
}

#contact {
    background-color: rgb(233, 232, 232);
    margin-left: 10px;
    border-radius: 5px;
    width: 290px;
}

.img-input {
    margin-top: 5px;
    margin-left: 20px;
}

.image-input {
    margin-right: 20px;
}

.input-file {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.custom-file-button {
    background-color: #ccc;
    color: #000;
    padding: 10px 10px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-file-button:hover,
.custom-file-button:focus {
    background-color: #aaa;
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

.submit-container {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    grid-area: 3/2/4/2;
    grid-column: span 2;
    /*row start / column start / row end / column end*/
}

.submit-btn {
    font-family: 'Roboto Condensed';
    font-size: large;
    font-weight: bold;
    background-color: #9b9999;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
    background-color: #a9a7a7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.invalid label {
    color: red;

}

p {
    font-size: small;
    margin-left: 10px;
    margin-bottom: 0%;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.invalid-images {
    margin-left: 85px;
}

.invalid-form {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    grid-area: 4/2/5/2;
    grid-column: span 2;
}
</style>