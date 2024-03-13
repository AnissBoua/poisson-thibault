<template>
    <!-- component -->
<!-- Container -->
<div class="flex flex-col h-screen bg-gray-100">
    <!-- Auth Card Container -->
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
        <div class="flex">
            <span class="text-center font-bold my-20 mx-auto">        
                <a href="https://egoistdeveloper.github.io/twcss-to-sass-playground/" target="_blank" class="text-blue-600">
                    Connexion
                </a>
            </span>
        </div>
    
    
        <!-- Auth Card -->
        <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg">

            <!-- Card Title -->
            <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
                Login
            </h2>

            <form @submit.prevent="login"
             class="mt-10" method="POST">
                <!-- Username Input -->
                <label for="Username" class="block text-xs font-semibold text-gray-600 uppercase">Username</label>
                <input id="username" type="text" name="Username" placeholder="e-mail address" autocomplete="Username"
                    class="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required v-model="username" />

                <!-- Password Input -->
                <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
                <input id="password" type="password" name="password" placeholder="password" autocomplete="current-password"
                    class="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                    required v-model="password" />

                <!-- Auth Buttton -->
                <button type="submit"
                    class="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none">
                    Login
                </button>

                <!-- Another Auth Routes -->
                <div class="sm:flex sm:flex-wrap mt-4 sm:mb-4 text-sm text-center">
              <p class="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                or
              </p>
  
              <a href="http://localhost:5173/register" class="button w-full py-3 mt-4 bg-gray-800 rounded-sm
                font-medium text-white uppercase
                focus:outline-none hover:bg-gray-700 hover:shadow-none">
                Create account
              </a>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { accountService } from "@/_services/account_services"

export default {
    name : 'Login',
    data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {

            accountService.login({
                username: this.username,
                password: this.password
            })
    // ici on charge les données de connexion
                .then(res => {
                   let token= accountService.saveToken(res.data.access_token)
                    this.$router.push('/')
                    console.log(token);
                })
                .catch(err => console.log(err))
//                    fetch('http://127.0.0.1:8000', {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 method: 'POST',
//                 body: JSON.stringify(this.user)
//             })
//                 .then(blob => blob.json())
//                 .then(data => {
//                     console.log(data)
//                     localStorage.setItem('token', data.access_token)
//                     this.$router.push('/admin/dashboard')
//                 })
//                 .catch(err => console.log(err))
//       // Ici vous pouvez gérer la soumission du formulaire, par exemple envoyer les données au serveur
        }
  }
};
</script>