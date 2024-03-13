<template>
  <YearlyMarginTaxes :mounthlyCa="mounthlyCa" ref="YearlyMarginTaxes" />
  <ChartBar ref="ChartBar" />
  <div class="flex my-4 gap-4">
    <ChartCake ref="ChartCake" />
    <TrimesterMargin />
  </div>
</template>

<script>
import ChartBar from "@/components/ChartBar.vue";
import MounthlyCa from "@/components/MounthlyCa.vue";
import YearlyMarginTaxes from "@/components/YearlyMarginTaxes.vue";
import ChartCake from "@/components/ChartCake.vue";
import TrimesterMargin from "@/components/TrimesterMargin.vue";
import axios from "axios";

export default {
  components: {
    ChartBar,
    MounthlyCa,
    YearlyMarginTaxes,
    ChartCake,
    TrimesterMargin,
  },
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
      if (data.type === "new_ca") {
        this.mounthlyCa = data.content;
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        this.$refs.ChartBar.refreshGraph(startDate, endDate);
        this.$refs.YearlyMarginTaxes.getYearlyMarginTaxes();
        this.$refs.ChartCake.setRepartition();
      }
    });
    socket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed:", event);
    });
    this.socket = socket;
    axios.get("ca/?mounthly_ca=true").then((response) => {
      this.mounthlyCa = response.data;
    });
  },
};
</script>

<style scoped></style>
