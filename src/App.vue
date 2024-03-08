<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <div class="px-4">
    <RouterView />
  </div>
</template>