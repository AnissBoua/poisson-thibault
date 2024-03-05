<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full rounded-t-md overflow-hidden text-sm text-left text-neutral-400">
            <thead class="bg-neutral-700 text-xs uppercase text-neutral-400">
                <tr>
                    <th v-if="checkbox" scope="col" class="p-4">
                        <div class="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-neutral-800 dark:focus:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600">
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" class="w-4 p-4">#</th>
                    <th v-for="(column, index) in columns.values" :key="columns.keys[index]" class="px-6 py-3">
                        {{ column }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index" class="border-b bg-neutral-800 border-neutral-700 hover:bg-neutral-600">
                    <td v-if="checkbox" class="w-4 p-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-neutral-800 dark:focus:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <td scope="row" class="font-medium py-4 px-6">{{ index + 1 }}</td>
                    <th v-for="column in columns.keys" :key="item[column]" scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                        {{ item[column] }}
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(['columns', 'data', 'checkbox'])
const columns = {
    keys: null,
    values: null
}
const data = props.data
const checkbox = props.checkbox

if (props.columns) {
    if (props.columns.length === 0) {
        console.error('Les colonnes sont requises')
    }

    if (typeof props.columns === 'object') {
        columns.keys = Object.keys(props.columns)
        columns.values = Object.values(props.columns)
    } else if (typeof props.columns === 'array') {
        // Keys are the values but in lowercase
        columns.keys = props.columns.map((column) => column.toLowerCase())
        columns.values = props.columns
    } else {
        console.error('Les colonnes doivent être un objet ou un tableau')
    }
}

if (data.length === 0) {
    console.error('Les données sont requises')
}

if (data.length > 0 && columns.length > 0) {
    data.forEach((item) => {
        // Is object ?
        if (typeof item === 'object') {
            for (const column in columns) {
                if (!item.hasOwnProperty(column)) {
                    console.error('Les données ne correspondent pas aux colonnes')
                    console.error('Les colonnes sont :', columns.keys)
                    console.error('Les données sont :', Object.keys(item));
                    console.error('Colonne manquante :', column);
                    break;
                }
            }
        } else {
            console.error('Les données doivent être un objet')
        }
    })
}
</script>