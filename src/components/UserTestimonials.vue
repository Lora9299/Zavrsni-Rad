<template>

    <div class="item-container">

        <div class="item">
            <div class="header">
                <img src="johndoe.png" alt="Profile Picture" class="profile-picture">
                <p class="name">JOHN DOE</p>
            </div>
            <div class="underline"></div>
            <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
        <div class="item">
            <div class="header">
                <img src="ariana2.png" alt="Profile Picture" class="profile-picture">
                <p class="name">ARIANA GRANDE</p>
            </div>
            <div class="underline"></div>
            <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>
        <div class="item">
            <div class="header">
                <img src="janedoe.png" alt="Profile Picture" class="profile-picture">
                <p class="name">JANE DOE</p>
            </div>
            <div class="underline"></div>
            <p class="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>

    </div>

</template>

<style scoped>
.item-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 300px;
    gap: 10px;
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);*/
    margin: 25px 20px;
    width: calc(100% - 40px);
    padding: 15px;

}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    /* border: 1px solid #d8d7d7;*/
    overflow: hidden;
    height: 300px;
}

.header {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.profile-picture {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 10px;
}

.name {
    font-weight: bold;
    margin-top: 20px;
    font-size: 1.1rem;
}

.underline {
    width: 90%;
    height: 1px;
    background-color: #d8d7d7;
    margin: 10px 0;
}

.description {
    padding: 20px;
    font-size: 1em;
}
</style>