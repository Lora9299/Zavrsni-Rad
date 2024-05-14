<template>

    <button>
        <slot></slot>
    </button>

</template>

<style scoped>
button {
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    font: inherit;
    background-color: #6c757d;
    border: 1px solid #6c757d;
    color: white;
    cursor: pointer;
    border-radius: 25px;
    margin-right: 0.5rem;
    display: inline-block;
}


button:hover,
button:active {
    background-color: #5c646c;
    border-color: #5c646c;
}

.flat {
    background-color: transparent;
    color: #6c757d;
    border: none;
}

.outline {
    background-color: transparent;
    border-color: #6c757d;
    color: #6c757d;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
    background-color: #edd2ff;
}
</style>