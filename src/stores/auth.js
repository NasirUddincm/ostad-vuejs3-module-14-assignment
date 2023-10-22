import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('user'),    
    registrationData: null,
  }), 
  actions: {
    registerUser({ username, email, password }) {
        // Simulate registration without an API
        const user = { username, email, password };
  
        // Store registration data in localStorage
        localStorage.setItem('registrationData', JSON.stringify(user));
        this.registrationData = user;
    },
    login(user) {
      this.user = user;
      this.isAuthenticated = true;
      // Store user data in localStorage or sessionStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
    },
  
    loginUser({ email, password }) {
      // Retrieve registered user data from local storage
      const registeredUser = JSON.parse(localStorage.getItem('registrationData'));

      if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
        // Login is successful; store user data
        this.user = { email: registeredUser.email }; // or you can store the whole user object
        this.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(this.user));
        return true;
      }

      return false; // Return false on login failure
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      // Remove user data from storage
      localStorage.removeItem('user');
    },
  },
});
