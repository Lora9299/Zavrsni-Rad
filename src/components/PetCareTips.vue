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
            <div class="item-content">Content for Tip 1</div>
        </div>
        <div class="item">
            <div class="item-title">
                <h5>TIP 2</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Content for Tip 2</div>
        </div>
        <div class="item">
            <div class="item-title">
                <h5>TIP 3</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Content for Tip 3</div>
        </div>
        <div class="item">
            <div class="item-title">
                <h5>TIP 4</h5>
                <div class="separator"></div>
            </div>
            <div class="item-content">Content for Tip 4</div>
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
    margin-top: 10px;
}
</style>