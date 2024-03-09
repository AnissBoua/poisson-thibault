<template>
  <div>
    <div
      class="border rounded text-black w-[15rem]"
      @mouseleave="closeDropdown"
    >
      <p v-show="!open" @click="openDropdown" class="text-center">
        {{ selected }}
      </p>
      <div
        v-if="open"
        class="text-black absolute bg-white w-[15rem] rounded border"
      >
        <input
          ref="searchInput"
          type="text"
          placeholder="Rechercher"
          class="border rounded w-full text-black"
          v-model="searchTerm"
          @input="onSearch"
        />
        <div
          class="border"
          :class="{ 'bg-gray-100': index % 2 === 0, 'hover:bg-blue-100': true }"
          @click="onSelectedOption({ id: '', name: 'Sélectionnez un produit' })"
        >
          Tous les produits
        </div>
        <div
          v-for="(option, index) in options.slice(0, 5)"
          :key="index"
          class="border"
          :class="{ 'bg-gray-100': index % 2 === 0, 'hover:bg-blue-100': true }"
          @click="onSelectedOption(option)"
        >
          {{ option.name }}
        </div>
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
        import.meta.env.VITE_API_URL + "/produits/?search=" + this.searchTerm
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
      this.$emit("change", option.id);
    },
  },
};
</script>

<style></style>
