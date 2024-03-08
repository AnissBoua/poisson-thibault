<template>
    <div class="absolute bg-neutral-900/70 w-full top-0 left-0 h-full flex items-center justify-center py-6" @click="item.toggle.Pourcentage = !item.toggle.Pourcentage">
    </div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3">
        <div class="w-full bg-neutral-700 rounded-md py-2 px-4">
            <div class="mb-2">
                <p><strong>Modifier le pourcentage de promotion du produit</strong></p>
                <p class="text-neutral-200">Produit sélectionné : <strong><span class="text-blue-500">{{ item.nom }}</span></strong></p>
            </div>
            <div v-if="error" class="my-1">
                <p class="text-neutral-200"><strong>Error : </strong><span class="text-red-500"> Juste les nombre sont autoriser </span></p>
            </div>
            <Input placeholder="Pourcentage promotion" name="pourcentage" :value="pourcentage" @update:output="(value) => pourcentage = value" />
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

const pourcentage = ref(item.pourcentage)
const error = ref(false)
function submit() {
    error.value = false
    const tmp = parseFloat(pourcentage.value)
    if (tmp.toString() !== pourcentage.value) { // If the value is not a number
        error.value = true
        return
    }
    tableStore.item.pourcentage = parseFloat(pourcentage.value)
    tableStore.item.prixSolde = tableStore.item.prix - ((tableStore.item.prix * pourcentage.value) / 100)
    tableStore.item.prixSolde = parseFloat(tableStore.item.prixSolde.toFixed(2))
}
</script>