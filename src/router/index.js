import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/auth/LoginComponent.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/auth/RegisterComponent.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductListPage.vue')
    },
    {
      path: '/product-details/:id',
      name: 'product-details',
      component: () => import('../views/ProductDetailPage.vue')
    },
    {
      path: '/shopping-cart',
      name: 'shopping-cart',
      component: () => import('../components/ShoppingCart.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../components/Checkout.vue'),
      meta: { requiresAuth: true },
    },
  ],
  
})



router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if(to.meta.requiresAuth && !authStore.isAuthenticated){
      next('/login')
  }else{
      next()
  }
})
export default router

