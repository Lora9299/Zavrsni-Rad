<template>

    <div class="item-container">

        <div class="item1">

            <div class="title">
                <span>H</span>
                <span>E</span>
                <span>A</span>
                <span>L</span>
                <span>T</span>
                <span>H</span>
            </div>

            <div class="main-content">

            </div>
            <div class="popped-out">
                <img src="vet.jpg" alt="Vet" class="vet-picture">
            </div>

        </div>


        <div class="item2">
            <div class="description">
                <p>Taking your pet for regular check-ups at the vet helps catch any potential issues early and monitors
                    their health.
                    Regular grooming helps keep your pet clean and reduces the risk of skin issues.
                    Brush your cat or dog's coat regularly to prevent matting and reduce shedding.
                    Dental health is crucial for dogs to prevent oral diseases such as gingivitis and periodontal
                    disease,
                    which can lead to more serious health problems. Ensure your pets are up to date on vaccinations,
                    parasite prevention (fleas, ticks, and heartworms),
                    and spaying/neutering if not intended for breeding.
                </p>
            </div>
        </div>


    </div>

</template>

<style scoped>
.item-container {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto auto;
    gap: 20px;
}

.item1 {
    position: relative;
    width: 400px;
    height: 500px;
    padding: 20px;
    margin: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    align-items: center;
    display: flex;
    flex-direction: column;
}

.item2 {
    margin-left: 100px;
    margin-top: 60px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 450px;
    width: 650px;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.title {
    display: flex;
    flex-direction: column;
    text-align: center;
}

.title span {
    font-size: 3em;
    padding-right: 220px;
}

.main-content {
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
}

.popped-out {
    position: absolute;
    top: 50%;
    left: 90%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 70%;
    background-color: #c9e5b8;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    font-size: 1em;
}

.vet-picture {
    width: 100%;
    height: 100%;
}

.description {
    text-align: center;
    line-height: 35px;
    padding: 60px;
}
</style>
