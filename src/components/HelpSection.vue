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
                        <p>Cats are independent animals which require less maintenance and attention, making them ideal
                            pets for people
                            with busy lifestyles. They adapt well to living in apartments or small houses because they
                            don't need large spaces
                            or the outdoors. They spend most of their time sleeping and are quiet animals convenient for
                            people who prefer
                            a pet that doesn't make much noise. Cats don't need to be taken out for a walk or need to be
                            trained,
                            they use litter boxes for their bathroom needs. The cost of care is less expensive because
                            most cats
                            have short fur and don't need grooming,
                            they groom themselves. Due to cats being smaller animals they don't need as much food as
                            dogs
                            do.
                        </p>
                    </div>
                </div>

            </div>
            <div class="item item-2">

                <div class="content">

                    <div class="description">
                        <p>Dogs are perfect pets for someone who loves spending time outdoors because they require lots
                            of exercise.
                            They are known for their loyalty towards their owner, ideal for someone seeking a close bond
                            with their pet.
                            Dogs can serve as home guards because they can alert their owners with barking or scare off
                            an intruder.
                            Owning a dog can help increase social interaction because dog owners can often meet other
                            owners at the dog park.
                            A lot of people enjoy training their dogs tricks and obedience which can make them suitable
                            for partaking in dog shows.
                            Dogs are family friendly pets, can serve as emotional support animals and therapy animals
                            for providing comfort and
                            reducing anxiety and stress.
                        </p>
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
    text-align: center;
    line-height: 30px;
}
</style>