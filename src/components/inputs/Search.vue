<template>
    <div class="relative flex items-center">
        <div class="absolute pl-2">
            <svg class="w-5 h-5 text-neutral-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input 
        v-model="search" 
        @keyup.enter="submit"
        type="text" id="table-search" class="w-full text-sm bg-neutral-700  text-white border border-neutral-300 rounded-lg py-2 px-10 " placeholder="Search for items">
    </div>
</template>

<script setup>
import axios from 'axios';
import { defineProps, ref } from 'vue';
const props = defineProps(['url'])
const search = ref('');
const url = ref('');
url.value = props.url

function submit() {
    console.log("Search for: " + search.value);
    console.log("URL: " + url.value);
    axios.get(url.value, {
        params: {
            search: search.value
        }
    })
}
</script>