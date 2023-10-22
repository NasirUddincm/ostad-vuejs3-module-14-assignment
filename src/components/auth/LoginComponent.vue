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
            <form  @submit.prevent="loginUser">
            <!-- Email input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="email">Email address</label>
                <input type="email" id="email" v-model="email"  class="form-control form-control-lg" />
                <div class="text-danger">{{ emailError }}</div>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
                <label class="form-label" for="pass">Password</label>
                <input type="password" id="pass" v-model="password"  class="form-control form-control-lg" />
                <div class="text-danger">{{ passwordError  }}</div>
                <div class="text-danger">{{ loginError }}</div>
            </div>
            
            <button type="submit" class="btn btn-primary btn-lg btn-block">Log in</button>
            
            <div class="d-flex justify-content-end align-items-end mb-4">
            
                <router-link to="/register">Register</router-link>
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
    import { ref } from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import router from '../../router';
    import NavBar from '../partials/NavBar.vue';
    import FooterComponent from '../partials/FooterComponent.vue';
  
  let email = '';
  let password = '';
  
  let emailError = ref('');
  let passwordError = ref('');
  let loginError = ref('');

  const authStore = useAuthStore();
  

  const loginUser = () => {
    // Reset error messages
    emailError.value = '';
    passwordError.value = '';
    loginError.value = '';

    // Get login data from the form
    const loginData = { email: email, password: password };

    // Validate email and password
    if (!email) {
      emailError.value = 'Please enter your email.';
      return;
    }

    if (!password) {
      passwordError.value = 'Please enter your password.';
      return;
    }

    // Check if the user exists
    const user = authStore.loginUser(loginData);

    if (user) {
      // Redirect to protected route upon successful login
      router.push({ name: 'home' });
    } else {
      // Handle login failure (e.g., show an error message)
      loginError.value = 'Email or password is incorrect.';
    }
  }

  </script>
  