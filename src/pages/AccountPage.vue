<template>
    <div class="account-container">
        <div class="user-info-container">
            <div>
                <h2>Logged in as: <span>{{ username }}</span></h2>
                <h6>Your email: <span>{{ email }}</span></h6>
                <div class="account-delete">
                    <button class="delete-button">
                        <font-awesome-icon class="x-icon" :icon="['fas', 'x']" />
                        Delete account
                    </button>
                </div>
            </div>
        </div>
        <div class="horizontal-line"></div>
        <div class="user-ads-container">
            <h2>Your Animals</h2>
            <div v-if="isLoading" class="spinner-container">
                <base-spinner></base-spinner>
            </div>
            <ul v-else-if="animals.length > 0">
                <animal-ad v-for="animal in animals" :key="animal.id" :id="animal.id" :title="animal.title"
                    :type="animal.type" :gender="animal.gender" :breed="animal.breed" :age="animal.age"
                    :price="animal.price" :description="animal.description" :location="animal.location"
                    :contact="animal.contact" :images="animal.images" @adDeleted="removeAdFromList"></animal-ad>
            </ul>
            <p v-else>You have no ads</p>
        </div>
    </div>
</template>

<script>
import AnimalAd from '../components/animals/AnimalAd.vue';
import BaseSpinner from '../components/BaseSpinner.vue';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            isLoading: false,
            animals: [],
        };
    },
    components: {
        AnimalAd,
        BaseSpinner,
    },
    computed: {
        ...mapGetters("users", ["user"]),
        username() {
            return this.user ? this.user.username : "";
        },
        email() {
            return this.user ? this.user.email : "";
        },
    },
    methods: {
        async fetchAnimals(animalType) {
            const db = getFirestore();
            const animalsQuery = query(
                collection(db, "animals", "animalData", animalType),
                where("userId", "==", this.user.uid)
            );
            const animalsSnapshot = await getDocs(animalsQuery);
            console.log(`Fetched ${animalType}:`, animalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            return animalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        removeAdFromList(adId) {
            this.animals = this.animals.filter(animal => animal.id !== adId);
        },
    },
    async created() {
        if (this.user) {
            this.isLoading = true;
            console.log("User ID:", this.user.uid);
            try {
                const cats = await this.fetchAnimals("cats");
                const dogs = await this.fetchAnimals("dogs");

                this.animals = [...cats, ...dogs];
                console.log("All fetched animals:", this.animals);
            } catch (error) {
                console.error("Error fetching animals:", error);
            } finally {
                this.isLoading = false;
            }
        } else {
            console.log("No user found");
        }
    }
};
</script>

<style scoped>
.account-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    align-items: center;
}

.user-info-container {
    width: 25%;
    padding: 2rem;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    position: relative;
    /* Make it a positioning context for the button */
    flex-grow: 1;
    /* Allow it to grow */
    justify-content: center;
}

.user-info-container h6 {
    font-weight: 400;
    padding: 10px;
}

.horizontal-line {
    width: 100%;
    height: 1px;
    background-color: #ccccccba;
}

.user-ads-container {
    width: 75%;
    /* Take the remaining width */
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    flex-grow: 1;
    /* Allow it to grow */
    justify-content: center;
}

.user-ads-container ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.user-ads-container li {
    margin-bottom: 0.5rem;
}

.account-delete {
    color: rgb(191, 56, 56);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}

.account-delete:hover {
    color: rgb(242, 56, 56);
}

.delete-button {
    display: flex;
    align-items: center;
    background: none;
    color: inherit;
    border: none;
    text-decoration: underline;
    font-size: 1rem;
    cursor: pointer;
}

.x-icon {
    color: rgb(191, 56, 56);
    margin-right: 0.5rem;
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>
