<template>
    <div class="account-container">
        <div class="user-info-container">
            <div>
                <h1>{{ username }}'s Account</h1>
                <h5> Your email: {{ email }}</h5>
            </div>
            <div class="account-delete">
                <button class="delete-button">
                    <font-awesome-icon class="x-icon" :icon="['fas', 'x']" />
                    Delete account
                </button>
            </div>

        </div>
        <div class="vertical-line"></div>
        <div class="user-ads-container">
            <h2>Your Animals</h2>
            <ul>
                <animal-ad v-for="animal in animals" :key="animal.id" :id="animal.id" :title="animal.title"
                    :type="animal.type" :breed="animal.breed" :age="animal.age" :price="animal.price"
                    :description="animal.description" :location="animal.location" :contact="animal.contact"></animal-ad>
            </ul>

        </div>
    </div>
</template>

<script>
import AnimalAd from '../components/animals/AnimalAd.vue';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            animals: [],
        };
    },
    components: {
        AnimalAd,
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

    async created() {
        if (this.user) {
            const db = getFirestore();

            const fetchAnimals = async (animalType) => {
                const animalsQuery = query(
                    collection(db, "animals", "animalData", animalType),
                    where("userId", "==", this.user.uid)
                );
                const animalsSnapshot = await getDocs(animalsQuery);
                return animalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            };

            const cats = await fetchAnimals("cats");
            const dogs = await fetchAnimals("dogs");

            this.animals = [...cats, ...dogs];
        }
    },
};
</script>

<style scoped>
.account-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 92vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.user-info-container {
    width: 25%;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
}

.user-info-container h5 {
    padding-top: 50%;
    padding-left: 10px;
}

.vertical-line {
    width: 1px;
    background-color: #ccccccba;
}

.user-ads-container {
    width: 90%;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
}

.user-ads-container ul {
    list-style-type: none;
    padding: 0;
}

.user-ads-container li {
    margin-bottom: 0.5rem;
}

.account-delete {
    color: rgb(191, 56, 56);
    margin-top: auto;
    margin-left: 80px;

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
</style>