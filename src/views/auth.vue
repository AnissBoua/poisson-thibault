<template>
<div class="flex flex-col h-screen">
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
        <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-neutral-700 rounded-lg shadow-md lg:shadow-lg">

            <h2 class="text-center font-semibold text-3xl lg:text-4xl">
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
        .then(res => {
            let token= accountService.saveToken(res.data.access)
            this.$router.push('/')
        })
        .catch(err => console.log(err))
    }
  }
};
</script>