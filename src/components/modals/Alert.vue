<template>
  <div
    class="fixed bg-neutral-900/70 w-full top-0 left-0 h-full flex items-center justify-center py-6"
  ></div>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3"
  >
    <div class="w-full bg-neutral-700 rounded-md py-2 px-4">
      <div class="mb-2">
        <p>
          <strong>{{ title }}</strong>
        </p>
        <p class="text-neutral-200">{{ message }}</p>
      </div>

      <div>
        <button
          class="w-full bg-grey-600 text-white rounded-md p-2 mt-2"
          @click="$emit('close')"
        >
          fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
  },
  emits: ["close"],
};
</script>

<style></style>
