<template>

    <div class="help-container">

        <div class="section-title">
            <h4>NOT SURE WHICH IS MORE SUITABLE FOR YOU?</h4>
        </div>

        <div class="item-container">

            <div class="item item-1">

                <div class="content">
                    <div class="item-title">
                        <p>CATS</p>
                        <img src="birman2.jpg" alt="Cat Picture" class="item-picture" />
                    </div>
                    <div class="separator"></div>
                    <div class="description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>

            </div>
            <div class="item item-2">

                <div class="content">

                    <div class="description">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                            voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                    <div class="separator"></div>
                    <div class="item-title">
                        <p>DOGS</p>
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
    text-align: right;
    /* Align the description text to the right */
}
</style>