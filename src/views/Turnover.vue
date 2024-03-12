<template>
  <YearlyMarginTaxes />
  <ChartBar />
  <!-- <ChartCake /> -->
</template>

<script>
import ChartBar from "@/components/ChartBar.vue";
import MounthlyCa from "@/components/MounthlyCa.vue";
import YearlyMarginTaxes from "@/components/YearlyMarginTaxes.vue";
import ChartCake from "@/components/ChartCake.vue";
import TrimesterMargin from "@/components/TrimesterMargin.vue";

export default {
  components: {
    ChartBar,
    MounthlyCa,
    YearlyMarginTaxes,
    ChartCake,
    TrimesterMargin,
  },
};
</script>

<style scoped></style>
