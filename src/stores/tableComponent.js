import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Utiliser pour les modal du composant table
export const useTableStore = defineStore('table', () => {
    // Input
    const item = ref({});
    function setItem(value) {
        item.value = value;
    }

    // Output
    const edits = ref([]);
    function setOutputs(value) {
        const ids = edits.value.map(e => e.id);
        if (ids.includes(value.id)) {
            edits.value = edits.value.map(e => e.id === value.id ? value : e);
        } else {
            edits.value.push(value);
        } 
    }

    return { item, setItem, edits, setOutputs}
})
