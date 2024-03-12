<template>
  <div class="bg-white h-fit rounded p-2">
    <label class="text-black">Répartition sur l'année :</label>
    <input
      v-model="year"
      class="text-black border rounded m-2"
      type="number"
      min="1990"
      max="2099"
      @change="setRepartition"
    />
    <canvas id="graphPie" aria-label="chart" height="350"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { shallowRef } from "vue";
import axios from "axios";

export default {
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
