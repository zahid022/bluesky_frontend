<script setup lang="ts">
import { tweet } from '@/services/api';
import { onMounted, ref, watch, type Ref } from 'vue';
import TweetCard from '../tweet/TweetCard.vue';
import type { Tweet } from '@/types/type';
import { trendStore } from '@/stores/trend.store';
import { storeToRefs } from 'pinia';

let data : Ref<Tweet[]> = ref([])

const store = trendStore()

const {refetch} = storeToRefs(store)

const getData = async () => {
    let response = await tweet.trend()
    
    data.value = response.tweets
}

onMounted(() => {
    getData()
})

watch(() => refetch.value, () => getData())
</script>

<template>
    <div>
        <TweetCard v-for="tweet in data" :key="tweet._id"  :item="tweet"/>
    </div>
</template>