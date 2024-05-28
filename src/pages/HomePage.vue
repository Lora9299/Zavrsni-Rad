<template>

    <the-carousel></the-carousel>
    <help-section></help-section>
    <pet-care-tips></pet-care-tips>
    <vet-tips></vet-tips>
    <user-testimonials></user-testimonials>


</template>


<script>

import UserTestimonials from "@/components/UserTestimonials.vue";
import TheCarousel from "@/components/TheCarousel.vue";
import PetCareTips from "@/components/PetCareTips.vue";
import HelpSection from "@/components/HelpSection.vue";
import VetTips from "@/components/VetTips.vue"

export default {

    components:
    {
        TheCarousel,
        UserTestimonials,
        PetCareTips,
        HelpSection,
        VetTips

    }


};
</script>
