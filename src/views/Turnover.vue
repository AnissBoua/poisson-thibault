<template>
  <div class="flex gap-4">
    <div class="w-1/2 border rounded bg-white p-2">
      <ChartBar />
    </div>
    <div class="w-1/2 flex gap-3">
      <MounthlyCa />
      <YearlyMarginTaxes />
    </div>
    <ChartCake />
  </div>
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
