<template>
  <div class="w-1/3 bg-neutral-700 h-fit rounded p-2">
    <Input
      label="Répartition sur l'année :"
      class="border rounded m-2"
      type="number"
      min="1990"
      max="2099"
      :value="year"
      @update:output="(value) => {
        year = value
        setRepartition()
      }"
    />
    <canvas id="graphPie" aria-label="chart" height="350"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { shallowRef } from "vue";
import axios from "axios";
import Input from "./inputs/Input.vue";

export default {
  components: {
    Input,
  },
  data() {
    return {
      label: [],
      datasets: [
        {
          label: "CA par catégorie en euro",
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384", // Rose vif
            "#36A2EB", // Bleu clair
            "#FFCE56", // Orange vif
            "#FF6384", // Rose vif
            "#F7F74E", // Jaune citron
            "#41A317", // Vert forêt
            "#722ED1", // Violet foncé
            "#D3D3D3", // Gris clair
          ],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
      graph: null,
      year: 2024,
    };
  },
  mounted() {
    var chrt = document.getElementById("graphPie");
    this.graph = shallowRef(
      new Chart(chrt, {
        type: "pie",
        data: {
          labels: this.label,
          datasets: this.datasets,
        },
        options: {
          responsive: true,
        },
      })
    );
    this.setRepartition();
  },
  methods: {
    async setRepartition() {
      console.log("setRepartition");
      let response = await axios.get(
        import.meta.env.VITE_API_URL + "ca/?repartition=" + this.year
      );
      let datas = response.data;
      this.label = [];
      this.datasets[0].data = [];
      for (let key in datas) {
        this.label.push(key);
        this.datasets[0].data.push(datas[key]);
      }
      this.graph.config.data.labels = this.label;
      this.graph.config.data.datasets = this.datasets;
      this.graph.update();
    },
  },
};
</script>

<style></style>
