<script setup>
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import { ref } from "vue";

const route = useRoute();
</script>

<template>
  <Header v-if="route.fullPath != '/auth'" />
  <div class="px-4">
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>
