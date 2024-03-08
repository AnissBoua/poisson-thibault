<template>
  <main>
    <div class="w-1/3 pb-4">
      <Search url="/test"/>
    </div>
    <div class="w-1/3 pb-4">
      <select class="w-full text-sm rounded-md p-2 bg-neutral-900" @change="getProduits($event.target.value)">
        <option value="">All</option>
        <option v-for="category in categories" :key="category.id" :value="category.slug">{{ category.nom }}</option>
      </select>
    </div>
    <div v-if="produits">
      <Table 
      :columns="{
        'nom': {
          'label': 'Product Name',
        },
        'prix': {
          'label': 'Price',
        },
        'onSale': {
          'label': 'On Sale',
        },
        'prixSolde': {
          'label': 'Sale Price',
        },
        'pourcentage': {
          'label': 'Percentage sale %',
          'modal': 'Pourcentage'
        },
        'stock': {
          'label': 'Stock',
          'modal': 'Stock'
        },
        'commentaire': {
          'label': 'Comment',
        },
        'category.nom': {
          'label': 'Category',
        },
      }"
      :data="produits"
      :router-link="{
        name: 'produit',
        property: 'id'
      }"
      />
    </div>
    <div class="flex justify-end my-2">
      <Button label="Envoyer" @click="submit" />
    </div>
  </main>
</template>

<script setup>
import Search from '@/components/inputs/Search.vue';
import Button from '@/components/inputs/Button.vue';
import Table from '@/components/Table.vue';
import axios from 'axios';
import { ref, watch } from 'vue';
import { useTableStore } from '@/stores/tableComponent';

const produits = ref(null);
const categories = ref(null);
const tableStore = useTableStore();

getProduits();
getCategories();

function getProduits(category = '') {
  const url = category === '' ? 'produits/' : 'produits/' + category + '/';
  axios.get(import.meta.env.VITE_API_URL + url)
    .then(response => {
      produits.value = response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function getCategories() {
  axios.get(import.meta.env.VITE_API_URL + 'categories/')
    .then(response => {
      for (const category of response.data) {
        category.nom = category.nom.charAt(0).toUpperCase() + category.nom.slice(1);
        category.slug = category.nom.toLowerCase().replace(/\s+/g, '-');
        category.slug = category.slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      }
      categories.value = response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function submit() {
  if (tableStore.edits.length == 0) return;
  axios.patch(import.meta.env.VITE_API_URL + 'produits/updates/', tableStore.edits)
    .catch(error => {
      console.log(error);
    });
}
</script>