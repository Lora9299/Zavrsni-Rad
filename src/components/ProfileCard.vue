<template>

    <div class="user-profile-card" v-if="show">
        <div class="user-profile-card-overlay" @click="close"></div>
        <div class="user-profile-content">
            <header>
                <h3>{{ title }}</h3>
                <button class="close-button" @click="close">X</button>
            </header>
            <div class="user-profile-info">
                <slot></slot>

            </div>
        </div>

    </div>

</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'User Profile'
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
.user-profile-card {
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

.user-profile-card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.user-profile-content {
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 90%;
    z-index: 100;
}

header {
    background-color: #9cc599;
    color: white;
    width: 100%;
    padding: 1rem;
}

.close-button {
    position: absolute;
    top: 35px;
    right: 40px;
    background: none;
    border: none;
    font-size: 25px;
    cursor: pointer;
}
</style>