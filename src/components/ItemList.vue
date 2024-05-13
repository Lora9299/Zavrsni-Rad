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
            const animals = this.$store.getters['animals/animals'];//.filter(animal => animal.type.toLowerCase() === this.animalType.toLowerCase());

            console.log('Animals:', animals);

            const animalsArray = Object.keys(animals).map(key => {
                const animal = animals[key];

                animal.key = key;
                return animal;
            });

            console.log('Animals array:', animalsArray);

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
            return this.$store.getters['animals/hasAnimals'];
        }
    },

    created() {
        this.loadAnimals();
    },

    methods: {
        setFilter(updatedFilter) {
            this.activeFilter = updatedFilter;
        },
        loadAnimals() {
            this.$store.dispatch('animals/loadAnimals');
        }
    }
};
</script>