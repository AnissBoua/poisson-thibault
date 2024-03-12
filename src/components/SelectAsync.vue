<template>
  <div class="relative bg-neutral-900 border border-neutral-700 rounded-lg p-2" @mouseleave="closeDropdown">
      <p @click="openDropdown">{{ selected }}</p>
      <div v-show="open" class="w-full absolute bg-neutral-900 rounded-md left-0 top-1">
        <input
          ref="searchInput"
          type="text"
          placeholder="Rechercher"
          class="bg-neutral-900 rounded-lg border-0 outline-none p-2"
          v-model="searchTerm"
          @input="onSearch"
        />
        <div class="hover:bg-neutral-500 py-1 px-2" @click="onSelectedOption({ id: 0, name: 'Sélectionnez un produit' })">
          <p>Tous les produits</p>
        </div>
        <div v-for="(option, index) in options.slice(0, 5)" :key="index" class="hover:bg-neutral-500 py-1 px-2" @click="onSelectedOption(option)">
          <p>{{ option.name }}</p>
        </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      open: false,
      selected: "Sélectionnez un produit",
      options: [],
      searchTerm: "",
    };
  },
  methods: {
    async onSearch() {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "produits/?search=" + this.searchTerm
      );
      let datas = response.data;
      this.options = datas
        .map((element) => ({
          id: element.id,
          name: element.nom,
        }))
        .slice(0, 5);
    },
    openDropdown() {
      this.open = true;
      this.$nextTick(() => {
        this.$refs.searchInput.focus();
      });
    },
    closeDropdown() {
      this.open = false;
    },
    onSelectedOption(option) {
      this.selected = option.name;
      this.open = false;
      this.$emit("selected", option.id);
    },
  },
};
</script>

<style></style>
