<template>
  <div
    class="flex w-full bg-neutral-700 rounded-md border border-neutral-400 px-4 mb-4"
  >
    <div class="flex items-center grow border-r border-neutral-500">
      <div>
        <p class="w-full text-neutral-200"><strong>CA mois :</strong></p>
        <div class="flex gap-4 items-center mt-2">
          <i
            class="fa-solid fa-dollar-sign text-xl bg-neutral-900 text-neutral-200 rounded-md py-1 px-3"
          ></i>
          <p
            class="text-3xl font-medium"
            :class="{
              'text-red-500': mounthlyCa < 0,
              'text-green-500': mounthlyCa >= 0,
            }"
          >
            {{ formatCurrency(mounthlyCa) }} €
          </p>
        </div>
      </div>
    </div>
    <div class="grow border-r border-neutral-500 py-2 px-4">
      <div class="flex items-center">
        <p class="w-1/4"><strong>Marge annuelle :</strong></p>
        <Input
          label=""
          name="name"
          type="number"
          min="1900"
          max="2099"
          step="1"
          @update:output="
            (value) => {
              year = value;
              getYearlyMarginTaxes();
            }
          "
          :value="year"
        />
      </div>
      <div class="flex items-center gap-4 mt-2">
        <i
          class="fa-solid fa-chart-column text-xl bg-neutral-900 text-neutral-200 rounded-md py-1.5 px-2.5"
        ></i>
        <p
          class="text-3xl font-medium"
          :class="{
            'text-red-500': yearlyMargin < 0,
            'text-green-500': yearlyMargin >= 0,
          }"
        >
          <span v-if="yearlyMargin > 0" class="text-green-500 font-medium"
            >+</span
          >
          {{ formatCurrency(yearlyMargin) }} €
        </p>
      </div>
    </div>
    <div class="grow py-2 px-4">
      <div class="h-full flex items-center">
        <div>
          <p class="text-neutral-200">
            <strong>Impôts {{ year }} (30%) :</strong>
          </p>
          <div class="flex gap-4 items-center mt-2">
            <i
              class="fa-solid fa-hand-holding-dollar text-xl bg-neutral-900 text-neutral-200 rounded-md py-1.5 px-2.5"
            ></i>
            <p class="text-red-500 text-3xl font-medium text-center">
              - {{ formatCurrency(yearlyTaxes) }} €
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Input from "./inputs/Input.vue";

export default {
  components: {
    Input,
  },
  props: {
    mounthlyCa: {
      type: Number,
      default: 0,
    },
  },
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
      let response = await axios.get("ca/?margin=" + this.year);
      let datas = response.data;
      this.yearlyMargin = datas.margin;
      if (datas.margin < 0) this.yearlyTaxes = 0;
      else this.yearlyTaxes = datas.taxes;
    },
    formatCurrency(value) {
      return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>
