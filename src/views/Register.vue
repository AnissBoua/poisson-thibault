<template>
    <!-- Container -->
    <div class="flex flex-col h-screen bg-gray-100">
      <!-- Registration Card Container -->
      <div class="grid place-items-center mx-2 my-20 sm:my-auto">
        <div class="flex">
          <span class="text-center font-bold my-20 mx-auto">
            <a href="https://egoistdeveloper.github.io/twcss-to-sass-playground/" target="_blank" class="text-blue-600">
              Inscription
            </a>
          </span>
        </div>
  
        <!-- Auth Card -->
        <div class="w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
              px-4 py-8 sm:px-8 sm:py-8 
              bg-white rounded-lg shadow-md lg:shadow-lg">
          <!-- Card Title -->
          <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
            Inscription
          </h2>
  
          <!-- Form -->
          <form @submit.prevent="register" class="mt-6 mx-auto max-w-lg">
            <!-- Nom Input -->
            <div>
              <label for="nom" class="block text-xs font-semibold text-gray-600 uppercase">Nom</label>
              <input id="nom" type="text" name="nom" placeholder="Last name" autocomplete="nom"
                class="block w-full py-3 px-1 mt-2 
                text-gray-800 appearance-none 
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required v-model="nom" />
            </div>
  
            <!-- Prenom Input -->
            <div>
              <label for="prenom" class="block text-xs font-semibold text-gray-600 uppercase">prenom</label>
              <input id="prenom" type="text" name="prenom" placeholder="First name" autocomplete="prenom"
                class="block w-full py-3 px-1 mt-2 
                text-gray-800 appearance-none 
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required v-model="prenom" />
            </div>
  
            <!-- Username Input -->
            <div>
              <label for="username" class="block text-xs font-semibold text-gray-600 uppercase">Username</label>
              <input id="username" type="text" name="username" placeholder="Username" autocomplete="Username"
                class="block w-full py-3 px-1 mt-2 
                text-gray-800 appearance-none 
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required v-model="username" />
            </div>
  
            <!-- Email Input -->
            <div>
              <label for="email" class="block text-xs font-semibold text-gray-600 uppercase">email</label>
              <input id="email" type="text" name="email" placeholder="e-mail address" autocomplete="email"
                class="block w-full py-3 px-1 mt-2 
                text-gray-800 appearance-none 
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required v-model="email" />
            </div>
  
            <!-- Password Input -->
            <div>
              <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
              <input id="password" type="password" name="password" placeholder="password" autocomplete="current-password"
                class="block w-full py-3 px-1 mt-2 mb-4
                text-gray-800 appearance-none 
                border-b-2 border-gray-100
                focus:text-gray-500 focus:outline-none focus:border-gray-200"
                required v-model="password" />
            </div>
  
            <!-- Auth Button -->
            <button type="submit" class="w-full py-3 bg-gray-800 rounded-sm
                font-medium text-white uppercase
                focus:outline-none hover:bg-gray-700 hover:shadow-none">
              Registration
            </button>
  
            <!-- Another Auth Routes -->
            <div class="sm:flex sm:flex-wrap mt-4 sm:mb-4 text-sm text-center">
              <p class="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                or
              </p>
  
              <a href="http://localhost:5173/auth" class="button w-full py-3 mt-4 bg-gray-800 rounded-sm
                font-medium text-white uppercase
                focus:outline-none hover:bg-gray-700 hover:shadow-none">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { accountService } from "@/_services/account_services"
  export default {
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

  