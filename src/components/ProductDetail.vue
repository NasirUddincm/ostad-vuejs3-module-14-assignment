<script setup>
import { computed } from 'vue';
import { products } from '@/components/database/products.js';
import { useRoute } from 'vue-router';

import { useCartStore } from '@/stores/cart';

const addToCart = (product) => {
  const cartStore = useCartStore();
  cartStore.addToCart(product);
}

const route = useRoute();
const productId = computed(() => route.params.id);

let product = computed(() => {
    return products.find(product => product.id == productId.value);
});
</script>
<template>
    <section class="py-5 my-5">
        <div class="container-fluid">
        <div class="row">   
            <div class="col-lg-5 col-6 mx-lg-0 mx-auto px-lg-0 px-md-0 my-auto">
                <img class="w-100 border-radius-lg shadow img-thumbnail" :src="product.image">
            </div>         
            <div class="col-lg-4 col-10 d-flex justify-content-center flex-column mx-auto text-lg-start text-center">
            <h2 class="mb-0 mt-lg-0 mt-4 text-gradient text-info">
                {{product.name}} Details       
            </h2>      
            <p><strong>Price: </strong> ${{ product.price }}</p>
            <p class="lead my-2">{{product.description}}</p> 

            <div>
                <button type="button" @click="addToCart(product)" class="btn btn-outline-warning me-2">
                    Add To Card
                </button>
            </div>

            </div>  
                      
        </div>
        
        </div>
    </section>
</template>