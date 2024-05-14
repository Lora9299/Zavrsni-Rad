<template>

    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>

    <div class="container">
        <section>
            <animal-filter @change-filter="setFilter" :initial-filter="activeFilter"></animal-filter>
        </section>
        <div class="refresh-btn">
            <base-button mode="outline" @click="loadAnimals">Refresh</base-button>
        </div>
    </div>

    <div v-if="isLoading" class="spinner-container"><base-spinner></base-spinner></div>
    <ul v-if="hasAnimals && !isLoading">
        <h2>{{ animalType === 'cat' ? 'CATS' : 'DOGS' }}</h2>

        <animal-item v-for="animal in filteredAnimals" :key="animal.id" :id="animal.id" :title="animal.title"
            :type="animal.type" :breed="animal.breed" :age="animal.age" :price="animal.price"></animal-item>
    </ul>

</template>

<script>
import AnimalItem from '../components/animals/AnimalItem.vue';
import AnimalFilter from '../components/animals/AnimalFilter.vue';
import { mapGetters } from 'vuex';

export default {

    props: {
        animalType: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            isLoading: false,
            error: null,
            activeFilter: {
                adoptable: true
            },
        }
    },

    components: {
        AnimalItem,
        AnimalFilter
    },

    computed: {

        ...mapGetters(['animals']),

        filteredAnimals() {
            const animals = this.$store.getters['animals/animals'];
            const animalsArray = Object.keys(animals).map(key => {
                const animal = animals[key];

                animal.key = key;
                return animal;
            });

            const typeFilter = animalsArray.filter(animal => {
                return animal.type.toLowerCase() === this.animalType.toLowerCase()
            });

            if (this.activeFilter.adoptable) {
                return typeFilter.filter(animal => animal.adoptable === true);
            } else {
                // If the adoptable checkbox is unchecked, return all animals
                return typeFilter.filter(animal => animal.adoptable === false);
            }
        },
        hasAnimals() {
            return !this.isLoading && this.$store.getters['animals/hasAnimals'];
        }
    },

    created() {

        const savedFilter = localStorage.getItem('animalFilter');
        if (savedFilter) {
            this.activeFilter = JSON.parse(savedFilter);
        }

        this.loadAnimals();
    },

    methods: {
        setFilter(updatedFilter) {
            this.activeFilter = updatedFilter;
            localStorage.setItem('animalFilter', JSON.stringify(this.activeFilter));

        },
        async loadAnimals() {

            this.isLoading = true;

            try {
                await this.$store.dispatch('animals/loadAnimals');
            } catch (error) {
                this.error = error.message || 'Something went wrong.';
            }
            this.isLoading = false;

        },
        handleError() {
            this.error = null;
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
}

.refresh-btn {
    margin-left: 920px;
}

.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
</style>