<template>
  <div>
    <p class="text-black text-center">
      Chiffre d'affaire sur la période : <strong>{{ periodeCa }}€</strong>
    </p>
    <select
      v-model="category"
      class="text-black border rounded"
      @change="onCategoryChange"
    >
      <option value="" selected>Sélectionnez une catégorie</option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.nom"
      >
        {{ option.nom }}
      </option>
    </select>
    <canvas id="graph" aria-label="chart" height="350"></canvas>
    <input
      type="date"
      class="mx-1 text-black border rounded"
      name=""
      id="startDate"
      @change="onStartDateChange"
    />
    <input
      type="date"
      class="text-black border rounded"
      name=""
      id="endDate"
      @change="onEndDateChange"
    />
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { shallowRef } from "vue";
import axios from "axios";

export default {
  async setup() {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/categories/"
    );
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
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          data: [],
        },
      ],
      category: "",
      periodeCa: 0,
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
        import.meta.env.VITE_API_URL +
          "/ca/?start=" +
          startDate.value +
          "&end=" +
          endDate.value
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
      let newStartDate = new Date(e.target.value);
      let endDate = document.getElementById("endDate").value;
      let url =
        this.category != ""
          ? import.meta.env.VITE_API_URL +
            "/ca/?start=" +
            e.target.value +
            "&end=" +
            endDate +
            "&category=" +
            this.category
          : import.meta.env.VITE_API_URL +
            "/ca/?start=" +
            e.target.value +
            "&end=" +
            endDate;
      let response = await axios.get(url);
      this.updatePeriodeCa(response.data);
      this.updateLabels(response.data);
    },
    async onEndDateChange(e) {
      let newEndDate = new Date(e.target.value);
      let startDate = document.getElementById("startDate").value;
      let url =
        this.category != ""
          ? import.meta.env.VITE_API_URL +
            "/ca/?start=" +
            startDate +
            "&end=" +
            e.target.value +
            "&category=" +
            this.category
          : import.meta.env.VITE_API_URL +
            "/ca/?start=" +
            startDate +
            "&end=" +
            e.target.value;
      let response = await axios.get(url);
      this.updatePeriodeCa(response.data);
      this.updateLabels(response.data);
    },
    async onCategoryChange(e) {
      let startDate = document.getElementById("startDate").value;
      let endDate = document.getElementById("endDate").value;
      let response = await axios.get(
        import.meta.env.VITE_API_URL +
          "/ca/?start=" +
          startDate +
          "&end=" +
          endDate +
          "&category=" +
          e.target.value
      );
      this.updatePeriodeCa(response.data);
      this.updateLabels(response.data);
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
  },
};
</script>

<style>
#graph {
  background-color: white;
  width: 100%;
}
</style>
