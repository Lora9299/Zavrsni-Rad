<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
            <p>{{ error }}</p>
        </base-dialog>

        <div class="container">
            <section>
                <animal-filter @change-filter="setFilter"></animal-filter>
            </section>
            <div class="refresh-btn">
                <base-button mode="outline" @click="refreshAnimals">Refresh</base-button>
            </div>
        </div>

        <div v-if="isLoading" class="spinner-container"><base-spinner></base-spinner></div>
        <ul v-if="hasAnimals && !isLoading">
            <h2>{{ animalType === 'cat' ? 'CATS' : 'DOGS' }}</h2>

            <animal-item v-for="animal in filteredAnimals" :key="animal.id" :id="animal.id" :title="animal.title"
                :type="animal.type" :breed="animal.breed" :age="animal.age" :months="animal.months"
                :years="animal.years" :price="animal.price"></animal-item>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AnimalItem from '../components/animals/AnimalItem.vue';
import AnimalFilter from '../components/animals/AnimalFilter.vue';

export default {
    props: {
        animalType: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isLoading: false,
            error: null,
        };
    },
    components: {
        AnimalItem,
        AnimalFilter,
    },
    computed: {
        ...mapGetters('animals', ['dogs', 'cats', 'hasAnimals', 'adoptableFilter']),
        filteredAnimals() {
            const animals = this.animalType === 'cat' ? this.cats : this.dogs;
            return animals.filter(animal => animal.type.toLowerCase() === this.animalType.toLowerCase() &&
                (this.adoptableFilter ? animal.adoptable : !animal.adoptable));
        },
    },
    watch: {
        adoptableFilter(newFilter) {
            console.log('Filter changed:', newFilter);
        },
    },
    created() {
        this.refreshAnimals();
    },
    methods: {
        ...mapActions('animals', ['loadAnimals', 'setAdoptableFilter']),
        setFilter(updatedFilter) {
            console.log('Parent received filter:', updatedFilter);
            this.setAdoptableFilter(updatedFilter.adoptable);
        },
        async refreshAnimals() {
            this.isLoading = true;
            try {
                await this.loadAnimals();
            } catch (error) {
                this.error = error.message || 'Something went wrong.';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        },
    },
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