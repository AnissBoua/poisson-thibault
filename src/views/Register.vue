<template>
    <div class="flex flex-col h-screen">
      <div class="grid place-items-center mx-2 my-20 sm:my-auto">
        <div class="w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-4 py-8 sm:px-8 sm:py-8 bg-neutral-700 rounded-lg shadow-md lg:shadow-lg">
          <h2 class="text-center font-semibold text-3xl lg:text-4xl">Inscription</h2>
          <form @submit.prevent="register" class="flex flex-col gap-y-2 mt-6 mx-auto max-w-lg">
            <div class="flex gap-4">
              <div class="w-1/2">
                <Input label="Nom" name="nom" :value="nom" @update:output="(value) => nom = value"/>
              </div>
              <div class="w-1/2">
                <Input label="Prenom" name="prenom" :value="prenom" @update:output="(value) => prenom = value"/>
              </div>
            </div>
            <div>
              <Input label="Username" name="username" :value="username" @update:output="(value) => username = value"/>
            </div>
            <div class="flex gap-4">
              <div class="w-1/2">
                <Input label="Email" name="email" :value="email" @update:output="(value) => email = value"/>
              </div>
              <div class="w-1/2">
                <Input label="Password" name="password" :value="password" @update:output="(value) => password = value"/>
              </div>
            </div>
            <button type="submit" class="w-full py-3 mt-10 bg-neutral-800 rounded-md font-medium uppercase hover:bg-neutral-600">Registration</button>
  
            <div class="sm:flex sm:flex-wrap mt-4 sm:mb-4 text-sm text-center">
              <p class="flex-1 text-neutral-200 text-md mx-4 my-1 sm:my-auto">
                Vous avez déjà un compte ?
                <router-link to="auth">
                  <a class="text-green-500">Connectez vous</a>
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
<script>
import Input from '@/components/inputs/Input.vue';
import { accountService } from "@/_services/account_services"
  export default {
    components: {
      Input,
    },
    name: 'Register',
    data() {
      return {
        nom: '',
        prenom: '',
        email: '',
        username: '',
        password: ''
      };
    },
    methods: {
    register() {

          let result=  accountService.register({
                nom: this.nom,
                prenom: this.prenom,
                email: this.email,
                username: this.username,
                password: this.password
            })

                .then(res => {
                    accountService.saveToken(res.data.access_token)
                    this.$router.push('/');
                })
                .catch(err => console.log(err))
                console.log(result);
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

  