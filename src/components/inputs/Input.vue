<template>
    <label v-if="label" :for="id"> {{ label }} </label>
    <input :type="type" :name="name" :id="id" class="w-full p-2 border bg-neutral-900 border-neutral-700 rounded-lg outline-none focus:border-white" :placeholder="placeholder" :value="output" @input="updateOutput($event.target.value)"/>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    value: {
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
})
const id = props.name.toLowerCase().replace(/ /g, '-');
// Need to emit the output to the parent component
// This is the only way to get the value from the input
// to the parent component
// start :
const emit = defineEmits();

const output = ref(props.value);

const updateOutput = (value) => {
  output.value = value;
  emit('update:output', value); // emitting the value to parent component
};


</script>