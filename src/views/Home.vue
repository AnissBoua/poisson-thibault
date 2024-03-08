<template>
  <main>
    <div class="w-1/3 pb-4">
      <Search url="/test"/>
    </div>
    <div v-if="data">
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
      :data="data"
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
// import Pourcentage from '@/components/modals/Pourcentage.vue';
import axios from 'axios';
import { ref } from 'vue';
import { useTableStore } from '@/stores/tableComponent';

const data = ref(null);
const tableStore = useTableStore();

axios.get(import.meta.env.VITE_API_URL + 'produits/')
  .then(response => {
    data.value = response.data;
  })
  .catch(error => {
    console.log(error);
  });

function submit() {
  if (tableStore.edits.length == 0) return;
  axios.patch(import.meta.env.VITE_API_URL + 'produits/updates/', tableStore.edits)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
}
</script>