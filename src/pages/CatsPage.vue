<template>
    <section>
        <h1>Cats Page</h1>
        <item-list animalType="cat"></item-list>
    </section>
</template>

<script>
import ItemList from '@/components/ItemList.vue';

export default {
    components: {
        ItemList,
    },
};
</script>