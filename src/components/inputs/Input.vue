<template>
    <label v-if="label" for=""> {{ label }} </label>
    <input :type="type" class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    }
})

</script>