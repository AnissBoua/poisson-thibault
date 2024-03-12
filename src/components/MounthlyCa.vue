<template>
  <div class="bg-neutral-700 grow flex justify-center rounded flex-wrap">
    <p class="w-full text-center"><strong>CA mois :</strong></p>
    <h1 
    class="text-4xl font-medium"
    :class="{
      'text-red-500': mounthlyCa < 0,
      'text-green-500': mounthlyCa >= 0,
    }"
    >{{ mounthlyCa.toFixed(2) }}€</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      socket: null,
      mounthlyCa: 0,
    };
  },
  mounted() {
    const socket = new WebSocket("ws://localhost:8000/ws/ca/");

    socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "confirmation") console.log(data.content);
      if (data.type === "new_ca") this.mounthlyCa = data.content;
    });
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });
    this.socket = socket;
    axios
      .get(import.meta.env.VITE_API_URL + "ca/?mounthly_ca=true")
      .then((response) => {
        this.mounthlyCa = response.data;
      });
  },
};
</script>

<style></style>
