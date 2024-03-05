<template>
  <main>
    <div class="w-1/3 pb-4">
      <Search url="/test"/>
    </div>
    <Table 
    :columns="{
      'name': 'Product Name',
      'category': 'Category',
      'price': 'Price'

    }"
    :data="data"
    />
  </main>
</template>

<script setup>
import Search from '@/components/inputs/Search.vue';
import Table from '@/components/Table.vue';
const data = [
  {
    name: 'Apple MacBook Pro 17"',
    category: 'Silver',
    type: 'Laptop',
    price: '$2999'
  }
]
</script>