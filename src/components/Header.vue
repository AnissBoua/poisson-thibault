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
      <RouterLink to="/auth">Login</RouterLink>
    </nav>
  </header>
</template>

<script setup></script>
