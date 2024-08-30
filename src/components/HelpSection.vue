<template>

    <div class="help-container">

        <div class="section-title">
            <h4>NISTE SIGURNI KOJA ŽIVOTINJA VAM VIŠE PAŠE?</h4>
        </div>

        <div class="item-container">

            <div class="item item-1">

                <div class="content">
                    <div class="item-title">
                        <p>MAČKE</p>
                        <img src="birman2.jpg" alt="Cat Picture" class="item-picture" />
                    </div>
                    <div class="separator"></div>
                    <div class="description">
                        <p>Mačke su samostalne životinje koje zahtijevaju manje održavanja i pažnje, što ih čini
                            idealnim ljubimcima za ljude s užurbanim načinom života. Dobro se prilagođavaju životu u
                            stanovima ili manjim kućama jer im nisu potrebni veliki prostori niti boravak na otvorenom.
                            Većinu vremena provode spavajući i tihe su životinje, što odgovara ljudima koji preferiraju
                            ljubimca koji ne stvara puno buke. Mačke ne trebaju šetnje niti trening, koriste pijesak za
                            svoje potrebe. Troškovi brige su manji jer većina mačaka ima kratku dlaku i ne treba im
                            uređivanje, sami se njeguju. Mačke su manje od pasa pa im ne treba im toliko
                            hrane kao psima s toga manje trošite na hranu za ljubimca.
                        </p>
                    </div>
                </div>

            </div>
            <div class="item item-2">

                <div class="content">

                    <div class="description">
                        <p>Psi su savršeni kućni ljubimci za nekoga tko voli provoditi vrijeme na otvorenom jer
                            zahtijevaju puno vježbanja. Poznati su po svojoj odanosti prema vlasniku, što ih čini
                            idealnima za nekoga tko traži blisku povezanost sa svojim ljubimcem. Psi mogu služiti kao
                            čuvari doma jer mogu upozoriti vlasnike lajanjem ili uplašiti uljeza. Vlasništvo psa može
                            pomoći u povećanju socijalne interakcije jer se vlasnici pasa često susreću s drugim
                            vlasnicima u parku za pse. Mnogi ljudi uživaju u podučavanju pasa trikovima i poslušnosti,
                            što ih može učiniti prikladnima za sudjelovanje na izložbama pasa. Psi su prijateljski
                            nastrojeni prema obitelji, mogu služiti kao životinje za emocionalnu podršku i terapijske
                            životinje koje pružaju utjehu te smanjuju tjeskobu i stres.
                        </p>
                    </div>
                    <div class="separator"></div>
                    <div class="item-title">
                        <p>PSI</p>
                        <img src="lab.png" alt="Dog Picture" class="item-picture" />

                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<style scoped>
.section-title {
    margin: 40px;
}

.item-title {
    font-weight: bold;
}

.item-title img {
    margin-top: 10px;
    width: 210px;
    height: 210px;
    border-radius: 4%;
    object-fit: cover;
}

.help-container {

    width: 100%;
    padding: 20px 90px;
    box-sizing: border-box;
}

.item-container {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr;
    gap: 20px;

}

.item {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    height: 300px;

}

.content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    padding: 0 50px;
}

.content .description {
    padding: 20px 50px
}

.item-title p {
    font-weight: bold;
    font-size: 2em;
    margin: 0 75px;

}

.separator {
    width: 1px;
    height: 100%;
    background-color: #d8d7d7;
    margin: 0 50px;
}

.description p {
    margin: 0;
    font-size: 1em;
    text-align: center;
    line-height: 30px;
}
</style>