<template>
    <span class="filter-option p-5">
        <input type="checkbox" id="adoptable" class="custom-checkbox" :checked="adoptableFilter" @change="setFilter">
        <label class="custom-label" for="adoptable">ZA UDOMLJAVANJE</label>
    </span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters('animals', ['adoptableFilter']),
    },
    methods: {
        ...mapActions('animals', ['setAdoptableFilter']),
        setFilter(event) {
            const isActive = event.target.checked;
            this.setAdoptableFilter(isActive);
            this.$emit('change-filter', { adoptable: isActive });
        }
    }
};
</script>

<style scoped>
.custom-checkbox {
    display: none;
}

.custom-label {
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
}

.custom-checkbox+.custom-label:before {
    content: '';
    position: absolute;
    left: -1%;
    top: 50%;
    transform: translateY(-45%);
    width: 18px;
    height: 18px;
    border: 2px solid #6c757d;
    border-radius: 4px;
    background-color: #fff;
    transition: background-color 0.2s, border-color 0.2s;
}

.custom-checkbox:checked+.custom-label:before {
    background-color: #6c757d;
    border-color: #6c757d;
}

.custom-checkbox:checked+.custom-label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
    width: 6px;
    height: 12px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
}
</style>
