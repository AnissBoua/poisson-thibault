<template>
    <div class="absolute bg-neutral-900/70 w-full top-0 left-0 h-full flex items-center justify-center py-6" @click="item.toggle.Stock = !item.toggle.Stock">
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3">
        <div class="w-full bg-neutral-700 rounded-md py-2 px-4">
            <div class="mb-2">
                <p><strong>Modifier le stock du produit</strong></p>
                <p class="text-neutral-200">Produit sélectionné : <strong><span class="text-blue-500">{{ item.nom }}</span></strong></p>
                <p class="text-neutral-200">Stock actuel : <strong><span class="text-blue-500">{{ item.stock }}</span></strong></p>
            </div>
            <div v-if="error" class="my-1">
                <p class="text-neutral-200"><strong>Error : </strong><span class="text-red-500"> Juste les nombre sont autoriser </span></p>
            </div>
            <div class="flex gap-4">
                <div class="w-1/2">
                    <Input placeholder="Stock" name="stock" :value="stock" @update:output="(value) => stock = value"/>
                </div>
                <div class="w-1/2">
                    <select name="type" id="type" class="w-full text-sm rounded-md p-2 bg-neutral-900" v-model="type">
                        <option value="achat"><strong>+</strong> (Achat)</option>
                        <option value="vente"><strong>-</strong> (Vente)</option>
                        <option value="peremption"><strong>Péremption</strong></option>
                    </select>
                </div>
            </div>
            <div>
                <button class="w-full bg-green-600 text-white rounded-md p-2 mt-2" @click="submit">Modifier</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import Input from '@/components/inputs/Input.vue';
import { useTableStore } from '@/stores/tableComponent';
import { ref } from 'vue';

const tableStore = useTableStore()
const item = tableStore.item

const stock = ref(0)
const type = ref('achat')
const error = ref(false)
function submit() {
    error.value = false
    const tmp = parseInt(stock.value)
    if (tmp.toString() !== stock.value) { // If the value is not a number
        error.value = true
        return
    }
    tableStore.item.stockChange = type.value
    switch (type.value) {
        case 'achat':
            tableStore.item.stock += parseInt(stock.value)
            break;
        case 'vente':
        case 'peremption':
            tableStore.item.stock -= stock.value
            break;
        default:
            break;
    }
}
</script>