<template>
  <h3 class="text-xl"><strong>Information produit</strong></h3>
  <p class="text-neutral-200">
    <RouterLink
      :to="{
        name: 'produit-edit',
        params: { id: id },
      }"
      >Modifié le produit</RouterLink
    >
  </p>
  <div v-if="data" class="my-10">
    <div class="flex py-6 border-t border-neutral-500">
      <div class="w-1/3">
        <p><strong>Produit</strong></p>
      </div>
      <div class="w-2/3 text-neutral-200">
        <p>{{ data.nom }}</p>
      </div>
    </div>
    <div class="flex py-6 border-t border-neutral-500">
      <div class="w-1/3">
        <p><strong>Prix</strong></p>
      </div>
      <div class="w-2/3 text-neutral-200">
        <p>{{ data.prix }} €</p>
      </div>
    </div>
    <div class="flex py-6 border-t border-neutral-500">
      <div class="w-1/3">
        <p><strong>Prix en promotion</strong></p>
      </div>
      <div class="w-2/3 text-neutral-200">
        <p>{{ data.prixSolde }} €</p>
      </div>
    </div>
    <div class="flex py-6 border-t border-neutral-500">
      <div class="w-1/3">
        <p><strong>Pourcentage de promotion</strong></p>
      </div>
      <div class="w-2/3 text-neutral-200">
        <p>{{ data.pourcentage }} %</p>
      </div>
    </div>
    <div class="flex py-6 border-t border-neutral-500">
      <div class="w-1/3">
        <p><strong>Stock</strong></p>
      </div>
      <div class="w-2/3 text-neutral-200">
        <p>{{ data.stock }}</p>
      </div>
    </div>
    <div class="flex py-6 border-t border-neutral-500">
      <div class="w-1/3">
        <p><strong>Quantité vendu</strong></p>
      </div>
      <div class="w-2/3 text-neutral-200">
        <p>2416</p>
      </div>
    </div>
    <div class="flex py-6 border-t border-neutral-500">
      <div class="w-1/3">
        <p><strong>Commentaires</strong></p>
      </div>
      <div class="w-2/3 text-neutral-200">
        <p>{{ data.commentaire }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Route = /produit/:id
import { useRoute } from "vue-router";
import { ref } from "vue";
import axios from "axios";
const id = useRoute().params.id;
const data = ref(null);

axios
  .get("produits/" + id + "/")
  .then((response) => {
    data.value = response.data;
  })
  .catch((error) => {
    console.log(error);
  });
</script>
