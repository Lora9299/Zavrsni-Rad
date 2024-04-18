<template>

    <section>
        <animal-filter @change-filter="setFilter"></animal-filter>
    </section>
    <ul v-if="hasAnimals">
        <h2>{{ animalType === 'cat' ? 'Cats' : 'Dogs' }}</h2>
        <animal-item v-for="animal in filteredAnimals" :key="animal.id" :id="animal.id" :title="animal.title"
            :type="animal.type" :breed="animal.breed" :age="animal.age" :price="animal.price"></animal-item>
    </ul>

</template>

<script>
import AnimalItem from '../components/animals/AnimalItem.vue';
import AnimalFilter from '../components/animals/AnimalFilter.vue';

export default {

    props: {
        animalType: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            activeFilter: {
                adoptable: true
            }
        }
    },

    components: {
        AnimalItem,
        AnimalFilter
    },

    computed: {

        filteredAnimals() {
            const animals = this.$store.getters['animals/animals'].filter(animal => animal.type.toLowerCase() === this.animalType.toLowerCase());
            if (this.activeFilter.adoptable) {
                return animals.filter(animal => animal.adoptable === true);
            } else {
                // If the adoptable checkbox is unchecked, return all animals
                return animals.filter(animal => animal.adoptable === false);
            }
        },
        hasAnimals() {
            return this.$store.getters['animals/hasAnimals'];
        }
    },
    methods: {
        setFilter(updatedFilter) {
            this.activeFilter = updatedFilter;
        }
    }
};
</script>