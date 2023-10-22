<script setup>
import NavBar from '@/components/partials/NavBar.vue';
import FooterComponent from '@/components/partials/FooterComponent.vue'
import ProductComponent from '@/components/ProductList.vue'
// import { products } from '@/components/database/products.js'
// import { RouterLink } from 'vue-router';
</script>
<template>    
    <NavBar/>
    <section class="bg-secondary-subtle py-3 mt-5">
            <ProductComponent/>
    </section>
    <FooterComponent/>
</template>