<template>
  <div class="bg-white w-1/4 h-[10rem] rounded">
    <p class="text-black text-center">Marge annuelle :</p>
    <input
      v-model="year"
      class="text-black border rounded w-full text-center h-[2rem]"
      type="number"
      min="1900"
      max="2099"
      step="1"
      @change="getYearlyMarginTaxes"
    />
    <h1
      class="text-4xl font-medium text-center mt-3"
      :class="{
        'text-red-500': yearlyMargin < 0,
        'text-green-500': yearlyMargin >= 0,
      }"
    >
      <span v-if="yearlyMargin > 0" class="text-green-500 font-medium">+</span>
      {{ yearlyMargin }}€
    </h1>
  </div>
  <div class="bg-white w-1/4 h-[10rem] flex justify-center flex-wrap rounded">
    <p class="text-black text-center w-full">Impôts (30%) :</p>
    <h1 class="text-red-500 text-4xl font-medium text-center">
      -{{ yearlyTaxes }}€
    </h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      year: 2024,
      yearlyMargin: 0,
      yearlyTaxes: 0,
    };
  },
  mounted() {
    this.getYearlyMarginTaxes();
  },
  methods: {
    async getYearlyMarginTaxes() {
      let response = await axios.get(
        import.meta.env.VITE_API_URL + "ca/?margin=" + this.year
      );
      let datas = response.data;
      this.yearlyMargin = datas.margin;
      if (datas.margin < 0) this.yearlyTaxes = 0;
      else this.yearlyTaxes = datas.taxes;
    },
  },
};
</script>

<style></style>
