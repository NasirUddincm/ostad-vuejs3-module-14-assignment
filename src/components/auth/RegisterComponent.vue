<template>
   <NavBar/>
  <section class="vh-100">
    <div class="container py-5 h-100">
        <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="img-fluid" alt="Phone image">
        </div>
        <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form  @submit.prevent="registerUser">
            <!-- Email input -->
            <div class="form-outline mb-4">
                <input type="text" id="username" v-model="username"  class="form-control form-control-lg" required/>
                <label class="form-label" for="username">User Name</label>
            </div>

            <div class="form-outline mb-4">
                <input type="email" id="email" v-model="email"  class="form-control form-control-lg" required/>
                <label class="form-label" for="email">Email address</label>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
                <input type="password" id="pass" v-model="password"  class="form-control form-control-lg" required/>
                <label class="form-label" for="pass">Password</label>
            </div>

            <button type="submit" class="btn btn-primary btn-lg btn-block">Register</button>
            
            <div class="d-flex justify-content-end align-items-end mb-4">
            
                <router-link to="/login">Login</router-link>
            </div>

            <!-- Submit button -->

            </form>
        </div>
        </div>
    </div>
   </section>
  
   <FooterComponent/>
  </template>
  
  <script setup>
    import { useAuthStore } from '@/stores/auth';
    import router from '../../router';
    import NavBar from '../partials/NavBar.vue';
    import FooterComponent from '../partials/FooterComponent.vue';
    let username = '';
    let email = '';
    let password = '';
  
    const authStore = useAuthStore();
  
    const registerUser = () => {
      authStore.registerUser({ username, email, password });
      // Optionally, you can redirect the user to the login page after registration.
      router.push({ name: 'login' });
    };
  </script>
  