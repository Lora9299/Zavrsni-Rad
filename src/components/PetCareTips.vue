<template>

    <div class="section-title">
        <h4>SAVJETI ZA NJEGU KUĆNIH LJUBIMACA</h4>
    </div>

    <div class="item-container">
        <div class="item">
            <div class="item-title">
                <h5>SAVJET 1</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Odvojite vrijeme za igru sa svojim ljubimcem, to može pomoći da potroše višak
                energije. Vodite svoje pse u redovite šetnje, a ovisno o veličini vašeg psa možda će trebati ići u
                šetnju
                jednom ili dvaput dnevno. To će održati zdravlje vašeg psa i osigurati mu dnevnu vježbu.
            </div>
        </div>
        <div class="item">
            <div class="item-title">
                <h5>SAVJET 2</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Redovito češljajte svoje kućne ljubimce. To može spriječiti da im se dlaka
                zapetlja i previše naraste, a također će pomoći dugodlakim mačkama da im se stvara manje kuglica dlake u
                stomaku.</div>
        </div>
        <div class="item">
            <div class="item-title">
                <h5>SAVJET 3</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Ovisno o veličini vašeg kućnog ljubimca, pružite mu hranu bogatu
                hranjivim tvarima. Bogata hrana pomaže u održavanju zdravlja vašeg ljubimca i može im pomoći da žive
                dulje.
            </div>
        </div>
        <div class="item">
            <div class="item-title">
                <h5>SAVJET 4</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content"> Mačke se osjećaju bolje u okruženjima koja potiču njihovo prirodno ponašanje, kao
                što je
                penjanje, grebanje i lov. Osigurajte im razne igračke, grebalice i vertikalne prostore poput mačjih
                stabala.</div>
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