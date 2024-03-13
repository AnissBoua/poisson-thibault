<template>
  <div class="bg-neutral-700 rounded-md py-2 px-4">
    <p class="text-center text-neutral-200">
      Chiffre d'affaire sur la période :
      <strong class="text-white">{{ periodeCa.toFixed(2) }}€</strong>
    </p>

    <div class="flex items-center gap-4 my-2">
      <div class="w-1/2">
        <select
          name="type"
          id="type"
          class="w-full text-sm rounded-md p-2 bg-neutral-900"
          v-model="category"
          @change="onCategoryChange"
        >
          <option value="" selected>Sélectionnez une catégorie</option>
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.id"
          >
            {{ option.nom }}
          </option>
        </select>
      </div>
      <div>
        <input
          id="saleprice"
          name="saleprice"
          v-model="isSale"
          type="checkbox"
          class="mx-1"
          @change="onSaleChange"
        />
        <label for="saleprice">Produits Soldés</label>
      </div>
    </div>
    <canvas id="graph" aria-label="chart" height="350"></canvas>
    <div class="w-full flex gap-2">
      <div class="w-full flex gap-4 my-4">
        <input
          type="date"
          class="w-1/3 bg-neutral-900 border border-neutral-700 rounded-lg outline-none focus:border-white p-2"
          name=""
          id="startDate"
          @change="onStartDateChange"
        />
        <input
          type="date"
          class="w-1/3 bg-neutral-900 border border-neutral-700 rounded-lg outline-none focus:border-white p-2"
          name=""
          id="endDate"
          @change="onEndDateChange"
        />
        <div class="w-1/3">
          <SelectAsync @selected="onProductChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { shallowRef } from "vue";
import axios from "axios";
import SelectAsync from "@/components/SelectAsync.vue";
import Input from "./inputs/Input.vue";

export default {
  components: {
    SelectAsync,
    Input,
  },
  async setup() {
    const response = await axios.get("categories/");
    let options = response.data;
    return { options };
  },
  data() {
    return {
      graph: null,
      label: [],
      datasets: [
        {
          label: "Chiffre d'affaire",
          backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(201, 203, 207, 0.5)",
          ],
          data: [],
        },
      ],
      category: "",
      periodeCa: 0,
      isSale: false,
    };
  },
  mounted() {
    this.setInitialDateInputs();
    this.getInitialDatesLabels();
    var chrt = document.getElementById("graph");
    this.graph = shallowRef(
      new Chart(chrt, {
        type: "bar",
        data: {
          labels: this.label,
          datasets: this.datasets,
        },
        options: {
          scales: {
            y: {
              ticks: {
                color: "rgb(212 212 212)",
              },
            },
            x: {
              ticks: {
                color: "rgb(212 212 212)",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
          responsive: true,
        },
      })
    );
  },
  methods: {
    async setInitialDateInputs() {
      var currentDate = new Date();
      let endDate = document.getElementById("endDate");
      endDate.value = currentDate.toISOString().split("T")[0];
      currentDate.setDate(currentDate.getDate() - 6);
      let startDate = document.getElementById("startDate");
      startDate.value = currentDate.toISOString().split("T")[0];
      let response = await axios.get(
        "ca/?start=" + startDate.value + "&end=" + endDate.value
      );
      this.updatePeriodeCa(response.data);
      this.updateLabels(response.data);
    },
    getInitialDatesLabels() {
      var currentDate = new Date();
      this.label = [];
      this.label.push(currentDate.toISOString().split("T")[0]);
      for (var i = 0; i < 6; i++) {
        currentDate.setDate(currentDate.getDate() - 1);
        this.label.unshift(currentDate.toISOString().split("T")[0]);
      }
    },
    async onStartDateChange(e) {
      let url = this.getUrl();

      let response = await axios.get(url);
      this.updatePeriodeCa(response.data);
      this.updateLabels(response.data);
    },
    async onEndDateChange(e) {
      let url = this.getUrl();
      let response = await axios.get(url);
      this.updatePeriodeCa(response.data);
      this.updateLabels(response.data);
    },
    async onCategoryChange(e) {
      let url = this.getUrl();
      let response = await axios.get(url);
      this.updatePeriodeCa(response.data);
      this.updateLabels(response.data);
    },
    async onSaleChange(e) {
      let url = this.getUrl();

      let response = await axios.get(url);
      this.updatePeriodeCa(response.data);
      this.updateLabels(response.data);
    },
    async onProductChange(product) {
      this.product = product;
      if (product == 0) {
        let endDate = document.getElementById("endDate");
        let startDate = document.getElementById("startDate");
        let url = "ca/?start=" + startDate.value + "&end=" + endDate.value;
        if (this.category != "") url += "&category=" + this.category;
        if (this.isSale) url += "&sale=true";
        let response = await axios.get(url);
        this.updatePeriodeCa(response.data);
        this.updateLabels(response.data);
      } else {
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        let url =
          "ca/?start=" + startDate + "&end=" + endDate + "&produit=" + product;
        if (this.category != "") url += "&category=" + this.category;
        if (this.isSale) url += "&sale=true";
        let response = await axios.get(url);
        this.updatePeriodeCa(response.data);
        this.updateLabels(response.data);
      }
    },
    updateLabels(cas) {
      this.labels = [];
      this.datasets[0].data = [];
      cas.forEach((date) => {
        this.labels.push(date.date);
        this.datasets[0].data.push(date.ca);
      });
      this.graph.config.data.labels = this.labels;
      this.graph.config.data.datasets = this.datasets;
      this.graph.update();
    },
    updatePeriodeCa(cas) {
      let periodeCa = 0;
      cas.forEach((date) => {
        periodeCa += date.ca;
      });
      this.periodeCa = periodeCa;
    },
    getUrl() {
      let startDate = document.getElementById("startDate").value;
      let endDate = document.getElementById("endDate").value;
      let url = "ca/?start=" + startDate + "&end=" + endDate;
      if (this.category != "") url += "&category=" + this.category;
      if (this.isSale) url += "&sale=true";
      if (this.product != "" && this.product) url += "&produit=" + this.product;
      return url;
    },
    refreshGraph() {
      let url = this.getUrl();
      axios.get(url).then((response) => {
        this.updatePeriodeCa(response.data);
        this.updateLabels(response.data);
      });
    },
  },
};
</script>

<style>
#graph {
  color: white;
  width: 100%;
}
</style>
