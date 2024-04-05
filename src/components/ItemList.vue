<template>

    <ul v-if="hasAnimals">
        <animal-item v-for="animal in filteredAnimals" :key="animal.id" :id="animal.id" :title="animal.title"
            :type="animal.type" :breed="animal.breed" :age="animal.age" :price="animal.price"></animal-item>
    </ul>

</template>

<script>
import AnimalItem from '../components/animals/AnimalItem.vue';

export default {

    components: {
        AnimalItem
    },

    computed: {
        filteredAnimals() {
            return this.$store.getters['animals/animals'];
        },
        hasAnimals() {
            return this.$store.getters['animals/hasAnimals'];
        }
    }
};
</script>