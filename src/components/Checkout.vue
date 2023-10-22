<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { useCartStore } from '@/stores/cart';
    import NavBar from './partials/NavBar.vue';
    import FooterComponent from './partials/FooterComponent.vue';

    const cartStore = useCartStore();
    const cartTotal = computed(() => cartStore.cartTotal);
    const cartItemCount = computed(() => cartStore.cartItems.length);
 

    onMounted(() => {
        cartStore.restoreCartData(); // Restore cart data from localStorage
    });
    const form = ref({
        shipping: '',
        payment: '',
        total: cartTotal,
        cardHolderName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        address: ''

    });
   const PlaceOrder = () => {
        alert('Order Placed Succesfully')
    }

</script>
<template>
   <NavBar/>
    <div class="container my-5 py-5">
        <form class="mt-4" @submit.prevent="PlaceOrder">
        <div class="row">
            <div class="col-md-6">
                <div class="form-outline form-white mb-4">
                    <table>
                        <tr>
                            <td><b>Total Item:</b></td>
                            <td>{{cartItemCount}}</td>
                        </tr>
                        <tr>
                            <td><b>Sub Total:</b></td>
                            <td>{{cartTotal}}</td>
                        </tr>
                    </table>
                    
                </div>
                
                <div class="form-outline form-white mb-4">
                    <label class="form-label" for="shipping">Shipping Address</label>
                    <input type="text" id="shipping" v-model="form.shipping" class="form-control" placeholder="Shipping Address" required/>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card bg-primary text-white rounded-3">
                    <div class="card-body">
                        
                        <h5 class="mb-0">Card details</h5>

                        <p class="small mb-2">Card type</p>
                        <a href="#!" type="submit" class="text-white"><i
                            class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                        <a href="#!" type="submit" class="text-white"><i
                            class="fab fa-cc-visa fa-2x me-2"></i></a>
                        <a href="#!" type="submit" class="text-white"><i
                            class="fab fa-cc-amex fa-2x me-2"></i></a>
                        <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x"></i></a>

                        
                        <div class="form-outline form-white mb-2">
                            <input type="text" id="typeName" class="form-control"
                            placeholder="Cardholder's Name" v-model="form.cardHolderName" required/>
                            <label class="form-label" for="typeName">Cardholder's Name</label>
                        </div>

                        <div class="form-outline form-white mb-2">
                            <input type="text" id="typeCard" class="form-control"
                            placeholder="1234 5678 9012 3457" v-model="form.cardNumber" required/>
                            <label class="form-label" for="typeCard">Card Number</label>
                        </div>

                        <div class="row mb-1">
                            <div class="col-md-6">
                            <div class="form-outline form-white">
                                <input type="text" id="typeExp" class="form-control"
                                placeholder="MM/YYYY" v-model="form.expiry"  required/>
                                <label class="form-label" for="typeExp">Expiration</label>
                            </div>
                            </div>
                            <div class="col-md-6">
                            <div class="form-outline form-white">
                                <input type="password" id="typeText" v-model="form.cvv" class="form-control"
                                placeholder="&#9679;&#9679;&#9679;"  required/>
                                <label class="form-label" for="typeText">Cvv</label>
                            </div>
                            </div>
                        </div>
                       

                        <hr>

                        <div class="d-flex justify-content-between">
                        <p class="mb-2">Subtotal</p>
                        <p class="mb-2">${{cartTotal}}</p>
                        </div>
                        
                        <button type="submit" class="btn btn-info btn-block btn-lg">
                        <div class="d-flex justify-content-between">
                            <span>${{cartTotal}}</span>
                            <span> Place Order <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                        </div>
                        </button>
                    
                    </div>
                    </div>
            </div>
        </div>
        </form>
    </div>
    <FooterComponent/>
</template>