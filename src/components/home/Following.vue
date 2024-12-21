<script setup lang="ts">
import { tweet } from '@/services/api';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useToast } from 'vue-toastification';
import TweetCard from '../tweet/TweetCard.vue';
import { trendStore } from '@/stores/trend.store';
import { storeToRefs } from 'pinia';

const data: Ref<any[]> = ref([])

const toast = useToast()

const store = trendStore()

const { refetch } = storeToRefs(store)

const getData = async () => {
    let response = await tweet.listMyFollow()
    if (!response) {
        toast.error("Post failed")
        return
    }
    data.value = response.tweets
}

watch(() => refetch.value, () => getData())

onMounted(() => getData())
</script>

<template>
    <div>
        <TweetCard v-for="tweet in data" :key="tweet._id" :item="tweet" />
    </div>
</template>