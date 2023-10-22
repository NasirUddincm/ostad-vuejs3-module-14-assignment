import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: []
  }), 
  getters: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    }
  },
  actions: {
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({
          product,
          quantity: 1
        });
      }
      // Save the cart data in localStorage for persistence
      this.persistCartData();
    },
    removeFromCart(index) {
      this.cartItems.splice(index, 1);
      // Save the cart data in localStorage for persistence
      this.persistCartData();
    },
    clearCart() {
      this.cartItems = [];
      // Save the cart data in localStorage for persistence
      this.persistCartData();
    },
    persistCartData() {
      // Store cart data in localStorage for persistence
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    },
    restoreCartData() {
      // Retrieve cart data from localStorage
      const storedData = JSON.parse(localStorage.getItem('cart'));
      if (storedData) {
        this.cartItems = storedData;
      }
    }
  }
});
