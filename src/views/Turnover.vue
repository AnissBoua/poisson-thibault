<template>
  <YearlyMarginTaxes />
  <ChartBar />
</template>

<script>
import ChartBar from "@/components/ChartBar.vue";
import MounthlyCa from "@/components/MounthlyCa.vue";
import YearlyMarginTaxes from "@/components/YearlyMarginTaxes.vue";
import ChartCake from "@/components/ChartCake.vue";

export default {
  components: {
    ChartBar,
    MounthlyCa,
    YearlyMarginTaxes,
    ChartCake,
  },
};
</script>

<style scoped></style>
