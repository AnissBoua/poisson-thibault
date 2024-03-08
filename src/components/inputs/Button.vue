<template>
    <button class="bg-neutral-500 rounded-md text-white py-2 px-4" :type="type"> {{ label }} </button>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    type: {
        type: String,
        default: 'button'
    },
    label: {
        type: String,
        default: ''
    }
})
</script>