<template>
  <header class="flex justify-between py-4 px-10">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.png"
      width="40"
      height="40"
    />
    <nav class="flex gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
      <RouterLink v-if="token" to="/auth" @click="logout">Logout</RouterLink>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from "vue";

const token = ref(localStorage.getItem("token"));
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  token.value = null;
}
</script>
