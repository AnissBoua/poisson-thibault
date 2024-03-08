<template>
    <div class="flex justify-center items-center gap-x-4 my-4">
        <div v-if="page > 1" class="hover:bg-neutral-500 rounded-md cursor-pointer py-1 px-2.5" @click="setPage(page - 1)">
            <span>Previous</span>
        </div>
        <div v-if="page > 2" class="hover:bg-neutral-500 rounded-md cursor-pointer py-1 px-2.5" @click="setPage(1)">
            <span>1</span>
        </div>
        <div v-if="page > 2">
            <span>...</span>
        </div>
        <template v-for="i in before()" :key="i">
            <div v-if="i < page" class="hover:bg-neutral-500 rounded-md cursor-pointer py-1 px-2.5" @click="setPage(i)">
                <span>{{ i }}</span>
            </div>
        </template>
        <template v-for="i in after()">
            <div v-if="i == page" class="bg-green-500 rounded-md cursor-pointer py-1 px-2.5" @click="setPage(i)">
                <span>{{ i }}</span>
            </div>
            <div v-else class="hover:bg-neutral-500 rounded-md cursor-pointer py-1 px-2.5" @click="setPage(i)">
                <span>{{ i }}</span>
            </div>
        </template>
        <div v-if="last - (page + 1) > 1">
            <span>...</span>
        </div>
        <div v-if="last - (page + 1) > 0" class="hover:bg-neutral-500 rounded-md py-1 px-2.5" @click="setPage(last)">
            <span class="cursor-pointer">{{ last }}</span>
        </div>
        <div v-if="page < last" class="hover:bg-neutral-500 rounded-md py-1 px-2.5" @click="setPage(last)">
            <span class="cursor-pointer">Next</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
    page: {
        type: Number,
        default: 1
    },
    limit: {
        type: Number,
        default: 1
    },
    total: {
        type: Number,
        default: 1
    },
    last: {
        type: Number,
        default: 1
    }
})
const emit = defineEmits();

function setPage(page) {
    emit('update:page', page)
    router.push({ query: { ...route.query, page: page } });
}

function before() {
    const range = [];
    for (let i = (props.page - 1); i < props.page; i++) {
        if (i <= 0) continue;
        range.push(i);
    }
    return range;
}

function after() {
    const range = [];
    for (let i = props.page; i <= props.last; i++) {
        range.push(i);
        if (i >= (props.page + 1)) break;
    }
    return range;
}
</script>