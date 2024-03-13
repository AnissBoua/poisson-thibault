<template>
    <h3 class="text-xl"><strong>Modification produit</strong></h3>
    <p class="text-neutral-200">
        <RouterLink :to="{
            name: 'produit',
            params: { id: id }
        }">visualiser le produit</RouterLink>
    </p>
    <div v-if="data" class="my-10">
        <div class="mt-2">
            <Input label="Product Name" name="name" :value="data.nom" />
        </div>
        <div class="mt-2">
            <Input label="Category" name="category" :value="data.category.nom" />
        </div>
        <div class="flex gap-4 mt-2">
            <div class="w-1/2">
                <Input label="Prix" name="price" :value="data.prix"/>
            </div>
            <div class="w-1/2">
                <Input label="Prix en promotion" name="priceSolde" :value="data.prixSolde" />
            </div>
        </div>
        <div class="flex gap-4 mt-2">
            <div class="w-1/2">
                <Input label="Stock" name="stock" type="number" :value="data.stock" />
            </div>
            <div class="w-1/2 flex items-end pb-3">
                <p>Quantité vendu : <span> {{ quantiteVendu }} </span> </p>
            </div>
        </div>
        <div class="mt-2">
            <Input label="Commentaire" name="commentaire" :value="data.commentaire" />
        </div>
        <div class="flex justify-end mt-4">
            <Button @click="submit" type="submit" label="Modifier" />
        </div>
    </div>
</template>

<script setup>
// Route = /produit/:id
import Input from '@/components/inputs/Input.vue';
import Button from '@/components/inputs/Button.vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

const id = useRoute().params.id;
const data = ref(null);
const quantiteVendu = 2416;

axios.get(import.meta.env.VITE_API_URL + 'produits/' + id + '/')
    .then(response => {
        data.value = response.data;
    })
    .catch(error => {
        console.log(error);
    });

function submit() {
    console.log("Submit");
}
</script>