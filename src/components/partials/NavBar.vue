<script setup>
    import { RouterLink } from 'vue-router';
    
    import { onMounted, computed } from 'vue';
    import { useCartStore } from '@/stores/cart';
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const cartStore = useCartStore();
    const authStore = useAuthStore();
    const cartItemCount = computed(() => cartStore.cartItems.length);

    function logout(){
        authStore.logout();
        router.push('/login');
    }   
    // Use onMounted to retrieve cart data when the component is mounted
    onMounted(() => {
        cartStore.restoreCartData(); // Restore cart data from localStorage
        authStore.user
    });
</script>
<template>
    <nav class="navbar shadow-sm fixed-top navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <RouterLink class="navbar-brand" to="/">
                <img src="/assets/img/logo.png" alt="">
            </RouterLink>

            <button 
                class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fw-semibold">
                    <li class="nav-item">
                        <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/products">Products</RouterLink>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="#">About Us</a>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link " to="/shopping-cart" role="button">
                            Carts ({{ cartItemCount }})
                        </router-link>                        
                    </li>    
                    <li class="nav-item" v-if="!authStore.isAuthenticated">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="authStore.isAuthenticated">
                        <button class="nav-link" @click="logout()">Logout</button>
                    </li>            
                </ul>            
            </div>
        </div>
    </nav>
</template>