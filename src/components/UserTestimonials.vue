<template>

    <div class="item-container">

        <div class="item">
            <div class="header">
                <img src="johndoe.png" alt="Profile Picture" class="profile-picture">
                <p class="name">JOHN DOE</p>
            </div>
            <div class="underline"></div>
            <p class="description"> I was hesitant to get a cat due to my busy schedule, but Whiskers has brought so
                much joy into my life.
                She always greets me when I come home. Her playfulness and affection reduced my stress levels. I highly
                recommend adopting a cat to anyone
                looking for a loyal and soothing companion.</p>
        </div>
        <div class="item">
            <div class="header">
                <img src="ariana2.png" alt="Profile Picture" class="profile-picture">
                <p class="name">ARIANA GRANDE</p>
            </div>
            <div class="underline"></div>
            <p class="description">Adopting Toulouse has been life-changing for me. His love for
                walks has motivated me to stay active. Toulouse's loyalty, sweetness and unconditional love offer
                immense
                emotional support. If you're considering getting a dog, know that they bring joy, companionship, and
                positive
                change to your life.</p>
        </div>
        <div class="item">
            <div class="header">
                <img src="janedoe.png" alt="Profile Picture" class="profile-picture">
                <p class="name">JANE DOE</p>
            </div>
            <div class="underline"></div>
            <p class="description">Adopting Garfield has been a life-changing experience. Garfield is full of energy and
                curiosity, making every day an adventure. He loves to explore every corner of the house and has a
                playful nature that never fails to make me smile. Adopting a cat is a
                wonderful way to bring happiness and comfort into your life.</p>
        </div>

    </div>

</template>

<style scoped>
.item-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 300px;
    gap: 10px;
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