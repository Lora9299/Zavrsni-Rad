<template>

    <div class="section-title">
        <h4>PET CARE TIPS</h4>
    </div>

    <div class="item-container">
        <div class="item">
            <div class="item-title">
                <h5>TIP 1</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Make sure to make time for playing with your pet, as this can help to drain the
                excess energy they have.
                Take your dogs on regular walks, depending on the size of your dog they may need to go for a walk once
                or twice a day. This will
                maintain the dogs health and be good daily exercise.
            </div>
        </div>
        <div class="item">
            <div class="item-title">
                <h5>TIP 2</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Groom your longhaired pets regularly. This can help prevent their fur getting
                tangled and overgrowing
                but will also help longhaired cats have less hairballs. </div>
        </div>
        <div class="item">
            <div class="item-title">
                <h5>TIP 3</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Provide your pets with food full of nutrients, depending on their size. Nutritious
                food helps
                maintain the health of your pet and help them live longer.
            </div>
        </div>
        <div class="item">
            <div class="item-title">
                <h5>TIP 4</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Cats thrive in environments that stimulate their natural behaviors such as
                climbing, scratching, and hunting.
                Provide a variety of toys, scratching posts, and vertical spaces like cat trees. </div>
        </div>
    </div>


</template>

<style scoped>
.section-title {
    padding-top: 30px;
    margin: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.section-title h4 {
    text-align: center;
}

.item-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 400px;
    gap: 10px;
    margin: 25px 5px;
    width: calc(100% - 10px);
    padding: 15px;

}

.item {
    background-color: #cfe0ce94;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    height: 400px;
    padding: 20px;
    box-sizing: border-box;
}

.item-title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
}

.item-title h5 {
    font-size: 1.5em;
    margin: 0;
    text-align: center;
}

.separator {
    width: 80%;
    height: 1px;
    background-color: #d8d7d7;
    margin-top: 10px;
}

.item-content {
    text-align: center;
    line-height: 30px;
    margin-top: 10px;
}
</style>