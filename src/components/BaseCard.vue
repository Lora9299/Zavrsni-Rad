<template>
    <div class="base-card" v-if="show">
        <div class="base-card-overlay" @click="close"></div>
        <div class="base-card-content">
            <header>
                <h3>{{ title }}</h3>
                <button class="close-button" @click="close">X</button>
            </header>
            <div class="base-card-body">
                <slot></slot>
            </div>
            <div class="base-card-footer">
                <button class="save-button" @click="save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            default: 'Edit Information'
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        save() {
            this.$emit('save');
        }
    }
};
</script>

<style scoped>
.base-card {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.base-card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.base-card-content {
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    z-index: 100;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}

.save-button {
    display: block;
    width: 100%;
    padding: 10px;
    background: #9cc599;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
}

.save-button:hover {
    background: #a2cc9f;
}
</style>
