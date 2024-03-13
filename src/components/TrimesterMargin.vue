<template>
  <div class="w-full h-1/2 bg-neutral-700 rounded-md p-4">
    <p class="text-neutral-200">Marge du :</p>
    <div class="flex gap-4 my-2">
      <select
        class="w-full text-sm rounded-md p-2 bg-neutral-900"
        name="trimestre"
        id="trimestre"
        v-model="trimester"
        @change="setTrimesterMargin"
      >
        <option value="1">1er trimestre</option>
        <option value="2">2ème trimestre</option>
        <option value="3">3ème trimestre</option>
        <option value="4">4ème trimestre</option>
      </select>
      <Input
        class="border rounded m-2"
        type="number"
        min="1990"
        max="2099"
        :value="year"
        @update:output="
          (value) => {
            year = value;
            setTrimesterMargin();
          }
        "
      />
    </div>
    <h1
      class="text-4xl font-medium"
      :class="{
        'text-red-500': trimesterMargin < 0,
        'text-green-500': trimesterMargin >= 0,
      }"
    >
      {{ formatCurrency(trimesterMargin) }}€
    </h1>
  </div>
  <Alert
    v-if="openAlert"
    :title="alertTitle"
    :message="alertMessage"
    @close="openAlert = false"
  />
</template>

<script>
import axios from "axios";
import Alert from "@/components/modals/Alert.vue";
import Input from "./inputs/Input.vue";

export default {
  components: {
    Alert,
    Input,
  },
  data() {
    return {
      trimesterMargin: 0,
      trimester: 1,
      year: new Date().getFullYear(),
      openAlert: false,
      alertMessage: "",
      alertTitle: "",
    };
  },
  mounted() {
    this.getTrimesterAndYear();
    this.setTrimesterMargin();
  },
  methods: {
    async setTrimesterMargin() {
      let response = await axios.get(
        "ca/?year=" + this.year + "&trimester=" + this.trimester
      );
      let datas = response.data;
      this.trimesterMargin = datas.margin;
      if (
        this.trimesterMargin > datas.averageMargin * 2 &&
        datas.averageMargin >= 0
      ) {
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
          particleCount: 500,
          scalar: 2,
          shapes: ["emoji"],
          shapeOptions: {
            emoji: {
              value: ["🦄", "🌈"],
            },
          },
        });

        this.alertMessage =
          "La marge est supérieure à 200% de la moyenne des six derniers trimestres !";
        this.alertTitle = "Marge exceptionnelle";
        this.openAlert = true;
      }
      if (this.trimesterMargin < 0) {
        this.alertMessage =
          "Attention La marge est négative pour ce trimestre !";
        this.alertTitle = "Marge négative";
        this.openAlert = true;
      }
    },
    formatCurrency(value) {
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getTrimesterAndYear() {
      let date = new Date();
      let month = date.getMonth() + 1;
      if (month <= 3) this.trimester = 1;
      else if (month <= 6) this.trimester = 2;
      else if (month <= 9) this.trimester = 3;
      else this.trimester = 4;
      this.year = date.getFullYear();
    },
  },
};
</script>

<style></style>
