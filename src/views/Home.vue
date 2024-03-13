<template>
  <main>
    <div class="w-1/3 pb-4">
      <Search
        :value="route.query.search || ''"
        @update:search="
          (value) => {
            router.push({ query: { ...route.query, search: value } });
            debounce();
          }
        "
      />
    </div>
    <div class="w-1/3 pb-4">
      <select
        class="w-full text-sm rounded-md p-2 bg-neutral-900"
        @change="getProduits($event.target.value)"
      >
        <option value="all">All</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.slug"
        >
          {{ category.nom }}
        </option>
      </select>
    </div>
    <div v-if="produits">
      <Table
        :columns="{
          nom: {
            label: 'Product Name',
          },
          prix: {
            label: 'Prix',
          },
          onSale: {
            label: 'Promotion ?',
          },
          prixSolde: {
            label: 'Prix Soldé',
          },
          pourcentage: {
            label: 'Pourcentage de solde',
            modal: 'Pourcentage',
          },
          stock: {
            label: 'Stock',
            modal: 'Stock',
          },
          vendu: {
            label: 'Vendu',
          },
          commentaire: {
            label: 'Comment',
          },
          'category.nom': {
            label: 'Category',
          },
        }"
        :data="produits"
        :router-link="{
          name: 'produit',
          property: 'id',
        }"
      />
    </div>
    <div v-if="produits">
      <Pagination :page="page" :limit="limit" :total="total" :last="last" />
    </div>
    <div class="flex justify-end my-2">
      <Button label="Envoyer" @click="submit" />
    </div>
  </main>
</template>

<script setup>
import Search from "@/components/inputs/Search.vue";
import Button from "@/components/inputs/Button.vue";
import Table from "@/components/Table.vue";
import Pagination from "@/components/Pagination.vue";
import axios from "axios";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTableStore } from "@/stores/tableComponent";
const tableStore = useTableStore();
const route = useRoute();
watch(
  () => route.query.page,
  () => {
    getProduits();
  }
);
const router = useRouter();

const produits = ref(null);
const categories = ref(null);
const category = ref("");
const page = ref(1);
const limit = ref(2);
const total = ref(0);
const last = ref(0);

getProduits();
getCategories();

function getProduits(cat = "") {
  if (cat !== "") {
    if (cat === "all") cat = "";
    category.value = cat;
  }
  let url =
    category.value === "" ? "produits/" : "produits/" + category.value + "/";

  let params = [];
  if (route.query.page) {
    params.push("page=" + route.query.page);
  }

  if (route.query.search) {
    params.push("search=" + route.query.search);
  }

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  axios
    .get(url)
    .then((response) => {
      produits.value = response.data.data;
      total.value = parseInt(response.data.total);
      limit.value = parseInt(response.data.limit);
      page.value = parseInt(response.data.page);
      last.value = parseInt(response.data.last);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getCategories() {
  axios
    .get("categories/")
    .then((response) => {
      for (const category of response.data) {
        category.nom =
          category.nom.charAt(0).toUpperCase() + category.nom.slice(1);
        category.slug = category.nom.toLowerCase().replace(/\s+/g, "-");
        category.slug = category.slug
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
      }
      categories.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

function submit() {
  if (tableStore.edits.length == 0) return;
  axios
    .patch("produits/updates/", tableStore.edits)
    .then((response) => {
      tableStore.edits = [];
      getProduits();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Pour eviter de faire des requetes a chaque fois que l'utilisateur tape dans le champ de recherche
const timer = ref(null);
function debounce() {
  clearTimeout(timer.value);
  timer.value = setTimeout(function () {
    getProduits();
  }, 1500);
}
</script>
