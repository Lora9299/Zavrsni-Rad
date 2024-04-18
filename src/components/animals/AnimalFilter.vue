<template>
    <span class="filter-option p-5">
        <input type="checkbox" id="adoptable" checked @change="setFilter">
        <label class="p-2" for="adoptable">Adoptable</label>
    </span>
</template>

<script>
export default {
    emits: ['change-filter'],
    data() {
        return {
            filter: {
                adoptable: true
            }
        };

    },
    methods: {
        setFilter(event) {
            const inputId = event.target.id;
            const isActive = event.target.checked;
            const updatedFilter = {
                ...this.filter,
                [inputId]: isActive
            };
            this.filter = updatedFilter;
            this.$emit('change-filter', updatedFilter);
        }
    },

}
</script>