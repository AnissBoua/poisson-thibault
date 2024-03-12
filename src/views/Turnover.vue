<template>
  <div class="flex gap-4">
    <div class="w-1/2 border rounded bg-white p-2">
      <ChartBar />
    </div>
    <div class="w-1/2">
      <MounthlyCa />
    </div>
  </div>
</template>

<script>
import ChartBar from "@/components/ChartBar.vue";
import MounthlyCa from "@/components/MounthlyCa.vue";

export default {
  components: {
    ChartBar,
    MounthlyCa,
  },
};
</script>

<style scoped></style>
