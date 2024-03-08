<template>
    <div class="overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full rounded-t-md overflow-hidden text-sm text-left text-neutral-300">
            <thead class="bg-neutral-700 text-xs uppercase">
                <tr>
                    <th v-if="checkbox" scope="col" class="p-4">
                        <div class="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-neutral-800 dark:focus:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600">
                            <label for="checkbox-all-search" class="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" class="w-4 p-4">#</th>
                    <th v-for="(column, index) in columns.values" :key="columns.keys[index]" class="px-6 py-3">
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index" class="border-b bg-neutral-800 even:bg-neutral-900 border-neutral-700 hover:bg-neutral-600">
                    <td v-if="checkbox" class="w-4 p-4">
                        <div class="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-neutral-800 dark:focus:ring-offset-neutral-800 focus:ring-2 dark:bg-neutral-700 dark:border-neutral-600">
                            <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                        </div>
                    </td>
                    <td v-if="routerLink" scope="row" class="font-medium py-4 px-6">
                        <RouterLink :to=" {
                            name: routerLink.name,
                            params: { [routerLink.property]: item[routerLink.property] }
                        }">{{ item.id }}</RouterLink>  
                    </td>
                    <th v-for="(column, j) of columns.keys" :key="item[column]" scope="row" class="font-medium text-white" >
                        <div class="px-6 py-4" @click="columns.values[j].modal ? editColumn(item, columns.values[j]) : null">
                            {{ getProperty(item, column) }}
                        </div>
                        <div v-if="columns.values[j].modal && item.toggle && item.toggle[columns.values[j].modal] && dynamicComponents[columns.values[j].modal]">
                            <component :is="dynamicComponents[columns.values[j].modal]" />
                        </div>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, defineProps, defineAsyncComponent, watch } from 'vue';
import { useTableStore } from '@/stores/tableComponent';
const props = defineProps([
    'columns', 
    'data',
    'routerLink',
    'checkbox',
])
const columns = ref({
    keys: null,
    values: null
})
const data = ref(props.data)
watch(() => props.data, (newValue) => {
    data.value = newValue
})
const checkbox = props.checkbox
let dynamicComponents = {}
const tableStore = useTableStore()

if (props.columns) {
    if (props.columns.length === 0) {
        console.error('Les colonnes sont requises')
    }

    if (typeof props.columns === 'object') {
        columns.value.keys = Object.keys(props.columns)
        columns.value.values = Object.values(props.columns)
    } else if (typeof props.columns === 'array') {
        // Keys are the values but in lowercase
        columns.value.keys = props.columns.map((column) => column.toLowerCase())
        columns.value.values = props.columns.map((column) => {
            return {
                label: column,
            }
        })
    } else {
        console.error('Les colonnes doivent être un objet ou un tableau')
    }

    for (const column of columns.value.values) {
        if (column.hasOwnProperty('modal')) {
            if (typeof column.modal === 'string') {
                const modal = defineAsyncComponent(() => {
                    return import(`@/components/modals/${column.modal}.vue`)
                });
                dynamicComponents[column.modal] = modal;
            }
        }
    }
}

if (props.data.length === 0) {
    console.error('Les données sont requises')
}

if (data.length > 0 && columns.value.keys.length > 0) {
    let error = false;
    data.forEach((item) => {
        if (error) return;

        if (typeof item === 'object') {
            for (const column of columns.value.keys) {
                let nestedColumns = null;
                if (column.includes('.')) nestedColumns = column.split('.');

                if (nestedColumns) itemCheckSubColumn(item, nestedColumns);
                else if (itemHasColumn(item, column)) continue;

                error = true;
                break;
            }
        } else {
            console.error('Les données doivent être un objet')
        }
    })
}

function itemHasColumn(item, column) {
    if (!item.hasOwnProperty(column)) {
        console.error('Les données ne correspondent pas aux colonnes')
        console.error('Les colonnes sont :', columns.value.keys)
        console.error('Les données sont :', Object.keys(item));
        console.error('Colonne manquante :', column);
        return false;
    }
    return true;
}

// Recursive, pour checker les sous-colonnes
function itemCheckSubColumn(item, columns, iteration = 0) {
    for (const i = iteration; i < columns.length; i++) {
        if (!itemHasColumn(item, columns[i])) return false;
        if (i === columns.length - 1) return item[columns[i]];

        return itemCheckSubColumn(item[columns[i]], columns, i + 1);
    }
}

function getProperty(item, column) {
    if (column.includes('.')) {
        const nestedColumns = column.split('.');
        return itemCheckSubColumn(item, nestedColumns);
    }
    return item[column];
}

function editColumn(item, column) {
    if (!item.toggle) item.toggle = {};
    item.toggle[column.modal] = !item.toggle[column.modal];

    this.tableStore.setItem(item);
}

tableStore.$subscribe((mutation, state) => {
    if (mutation.events.key == "value") return;
    if (mutation.events.newValue == mutation.events.oldValue) return;
    if (!mutation.events.target?.id) return;
    tableStore.setOutputs(mutation.events.target)
})
</script>

<script>
// DOC

// LES PROPS
// routerLink, est le lien vers le quelle il faut rediriger pour visiter une element example : { name: 'produit', params: { id: item.id } }
</script>