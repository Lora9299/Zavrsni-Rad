<template>
    <section>
        Dogs Page
        <item-list animalType="dog"></item-list>
    </section>
</template>

<script>
import ItemList from '@/components/ItemList.vue';

export default {
    components: {
        ItemList
    }

}
</script>
