<template>
  <div>
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

export default {
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
          data: [2, 8, 10, 7, 6, 12, 15],
        },
      ],
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
          responsive: true,
        },
      })
    );
  },
  methods: {
    setInitialDateInputs() {
      var currentDate = new Date();
      document.getElementById("endDate").value = currentDate
        .toISOString()
        .split("T")[0];
      currentDate.setDate(currentDate.getDate() - 6);
      document.getElementById("startDate").value = currentDate
        .toISOString()
        .split("T")[0];
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
    onStartDateChange(e) {
      let newStartDate = new Date(e.target.value);
      let initialStartDate = new Date(this.label[0]);
      if (newStartDate.getTime() == initialStartDate.getTime()) {
        return;
      }
      if (newStartDate.getTime() < initialStartDate.getTime()) {
        let dateReached = false;
        let newLabel = [...this.label];
        while (dateReached === false) {
          let newDate = new Date(newLabel[0]);
          newDate.setDate(newDate.getDate() - 1);
          newLabel.unshift(newDate.toISOString().split("T")[0]);

          if (newDate.getTime() == newStartDate.getTime()) {
            dateReached = true;
          }
        }
        this.label = newLabel;
      } else {
        let dateReached = false;
        let newLabel = [...this.label];
        while (dateReached === false) {
          newLabel.shift();
          let newDate = new Date(newLabel[0]);
          if (newDate.getTime() == newStartDate.getTime()) {
            dateReached = true;
          }
          this.label = newLabel;
        }
      }
      this.graph.config.data.labels = this.label;
      this.graph.update();
    },
    onEndDateChange(e) {
      let newEndDate = new Date(e.target.value);
      let initialEndDate = new Date(this.label[this.label.length - 1]);
      if (newEndDate.getTime() == initialEndDate.getTime()) {
        return;
      }
      if (newEndDate.getTime() > initialEndDate.getTime()) {
        let dateReached = false;
        let newLabel = [...this.label];
        while (dateReached === false) {
          let newDate = new Date(newLabel[newLabel.length - 1]);
          newDate.setDate(newDate.getDate() + 1);
          newLabel.push(newDate.toISOString().split("T")[0]);

          if (newDate.getTime() == newEndDate.getTime()) {
            dateReached = true;
          }
        }
        this.label = newLabel;
      } else {
        let dateReached = false;
        let newLabel = [...this.label];
        while (dateReached === false) {
          newLabel.pop();
          let newDate = new Date(newLabel[newLabel.length - 1]);
          if (newDate.getTime() == newEndDate.getTime()) {
            dateReached = true;
          }
          this.label = newLabel;
        }
      }
      this.graph.config.data.labels = this.label;
      this.graph.update();
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
