<template>

    <div class="item-container">

        <div class="item">
            <div class="header">
                <img src="johndoe.png" alt="Profile Picture" class="profile-picture">
                <p class="name">JOHN DOE</p>
            </div>
            <div class="underline"></div>
            <p class="description"> Bio sam neodlučan oko nabave mačke zbog svog užurbanog rasporeda, ali
                Whiskers je donijela toliko radosti u moj život. Uvijek me dočeka pred vratima kad se vratim kući.
                Njezina
                razigranost i ljubaznost smanjili su moje razine stresa. Toplo preporučujem usvajanje mačke svakome tko
                traži odanog i umirujućeg suputnika.</p>
        </div>
        <div class="item">
            <div class="header">
                <img src="ariana2.png" alt="Profile Picture" class="profile-picture">
                <p class="name">ARIANA GRANDE</p>
            </div>
            <div class="underline"></div>
            <p class="description">Usvajanje Toulousa promijenilo je moj život. Njegova ljubav prema šetnjama motivirala
                me je da ostanem aktivna. Toulousova odanost, ljubaznost i bezuvjetna ljubav pružaju mi ogromnu
                emocionalnu podršku. Ako razmišljate o nabavi psa, znajte da donose radost, društvo i pozitivne promjene
                u vaš život.</p>
        </div>
        <div class="item">
            <div class="header">
                <img src="janedoe.png" alt="Profile Picture" class="profile-picture">
                <p class="name">JANE DOE</p>
            </div>
            <div class="underline"></div>
            <p class="description">Usvajanje Garfielda bilo je iskustvo koje je promijenilo moj život. Garfield je pun
                energije i znatiželje, čineći svaki dan avanturom. Voli istraživati svaki kutak kuće i ima razigranu
                narav koja me uvijek nasmijava. Usvajanje mačke sjajan je način da u svoj život donesete sreću i utjehu.
            </p>
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