<template>
<div class="flex flex-col h-screen">
    <div class="grid place-items-center mx-2 my-20 sm:my-auto">
        <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-neutral-700 rounded-lg shadow-md lg:shadow-lg">
            <h2 class="text-center font-semibold text-3xl lg:text-4xl">Login</h2>

            <form @submit.prevent="login" class="mt-10" method="POST">
                <div class="my-2">
                    <Input label="Username" name="username" :value="username" @update:output="(value) => username = value"/>
                </div>
                <div class="my-2">
                    <Input label="Password" name="password" :value="password" @update:output="(value) => password = value"/>
                </div>
                <button type="submit" class="w-full py-3 mt-10 bg-neutral-800 rounded-md font-medium uppercase hover:bg-neutral-600">Login</button>

                <div class="sm:flex sm:flex-wrap mt-4 sm:mb-4 text-sm text-center">
                    <p class="flex-1 text-neutral-200 text-md mx-4 my-1 sm:my-auto">
                        Vous n'avez pas de compte ? <a href="http://localhost:5173/register" class="text-green-500">Inscrivez vous</a>
                    </p>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import { accountService } from "@/_services/account_services"
import Input from '@/components/inputs/Input.vue';

export default {
    components: {
        Input,
    },
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