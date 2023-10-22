<script setup>
    import { computed, onMounted } from 'vue';
    import { useCartStore } from '@/stores/cart';
    
    import NavBar from './partials/NavBar.vue';
    import footerComponent from './partials/FooterComponent.vue';

    const cartStore = useCartStore();
    const cartItems = computed(() => cartStore.cartItems);
    const cartTotal = computed(() => cartStore.cartTotal);
    const cartItemCount = computed(() => cartStore.cartItems.length);
 

    onMounted(() => {
        cartStore.restoreCartData(); // Restore cart data from localStorage
    });

    const removeFromCart = (index) => {
    cartStore.removeFromCart(index);
    }
</script>
<template>
    <NavBar/>
    <section class="h-100 h-custom mt-5" style="background-color: #eee;">
        <div class="container py-5 h-100">           
            <div class="card">
                <div class="card-body p-4">                    
                    <h5 class="mb-3"><router-link to="/" class="text-body"><i
                        class="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</router-link></h5>
                    <hr>
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <p class="mb-1">Shopping cart</p>
                            <p class="mb-0">You have ({{cartItemCount}}) items in your cart</p>
                        </div>                        
                    </div>
                    <div class="card mb-3" v-for="(item, index) in cartItems" :key="index">
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                                <div>
                                <img
                                    :src="item.product.image"
                                    class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                                </div>
                                <div class="ms-3">
                                <h5>{{item.product.name}}</h5>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                                <div style="width: 120px;" class="me-5">
                                <input type="number" v-model="item.quantity" class="form-control">
                                </div>
                                <div style="width: 180px;">
                                <h5 class="mb-0">${{ item.product.price * item.quantity }}</h5>
                                </div>
                                <a href="#" @click="removeFromCart(index)">
                                    <i class="fas fa-trash-alt"></i>
                                </a>
                            </div>
                            </div>                       
                        </div>                  
                    </div>
                    <div class="row justify-content-end">
                        <div class="col-md-3">
                            <table class="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>Sub Total: </td>
                                        <td>${{cartTotal}}</td>
                                    </tr>                                
                                    <tr>
                                        <td>Total: </td>
                                        <td>${{cartTotal}}</td>
                                    </tr>
                                </tbody>

                            </table>

                            <router-link to="/checkout" class="btn btn-primary btn-block btn-lg">
                                Checkout <i class="fas fa-long-arrow-alt-right me-2"></i> 
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    </section>
        <footerComponent/>
</template>
  


  