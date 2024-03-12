<template>
  <div class="bg-white w-1/4 h-[10rem] flex justify-center rounded flex-wrap">
    <p class="text-black w-full text-center">marge du :</p>
    <select
      v-model="trimester"
      class="text-black border rounded"
      @change="setTrimesterMargin"
    >
      <option value="1">1er trimestre</option>
      <option value="2">2ème trimestre</option>
      <option value="3">3ème trimestre</option>
      <option value="4">4ème trimestre</option>
    </select>
    <input
      v-model="year"
      class="text-black border rounded m-2"
      type="number"
      min="1990"
      max="2099"
      @change="setTrimesterMargin"
    />
    <h1 class="text-green-500 text-4xl font-medium">{{ trimesterMargin }}€</h1>
  </div>
  <Alert
    v-if="openAlert"
    title="Marge négative"
    :message="alertMessage"
    @close="openAlert = false"
  />
</template>

<script>
import axios from "axios";
import Alert from "@/components/modals/Alert.vue";

export default {
  components: {
    Alert,
  },
  data() {
    return {
      trimesterMargin: 0,
      trimester: 1,
      year: 2024,
      openAlert: false,
      alertMessage: "Attention La marge est négative pour ce trimestre !",
    };
  },
  mounted() {
    this.setTrimesterMargin();
  },
  methods: {
    async setTrimesterMargin() {
      let response = await axios.get(
        import.meta.env.VITE_API_URL +
          "ca/?year=" +
          this.year +
          "&trimester=" +
          this.trimester
      );
      let datas = response.data;
      this.trimesterMargin = datas.margin;
      if (this.trimesterMargin > datas.averageMargin * 2) {
        const defaults = {
          spread: 360,
          ticks: 100,
          gravity: 0,
          decay: 0.94,
          startVelocity: 30,
        };
        confetti({
          ...defaults,
          particleCount: 30,
          scalar: 1.2,
          shapes: ["circle", "square"],
          colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
        });

        confetti({
          ...defaults,
          particleCount: 20,
          scalar: 2,
          shapes: ["emoji"],
          shapeOptions: {
            emoji: {
              value: ["🦄", "🌈"],
            },
          },
        });
      }
      if (this.trimesterMargin < 0) {
        this.openAlert = true;
      }
    },
  },
};
</script>

<style></style>
