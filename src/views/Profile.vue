<script setup lang="ts">
import {  tweet, User } from '@/services/api';
import { onMounted, ref, watch, type Ref } from 'vue';
import img from '@/assets/img/avatar.jpg'
import TweetCard from '@/components/tweet/TweetCard.vue';
import { trendStore } from '@/stores/trend.store';
import { storeToRefs } from 'pinia';
import EditProfile from '@/components/profile/EditProfile.vue';
import { editProfile } from '@/stores/edit.profile';

let userLocal: any = localStorage.getItem("user")
userLocal = userLocal ? JSON.parse(userLocal) : ''

const id = userLocal._id;

const user: Ref<any> = ref({})
const posts: Ref<any[]> = ref([])

const refetchStore = trendStore()

const { refetch } = storeToRefs(refetchStore)

const getData = async () => {
    let response = await User.getUserById(id)
    user.value = response
}


const getPosts = async () => {
    let response = await tweet.listByUser(id)

    posts.value = response.tweets
}

watch(() => refetch.value, () => getPosts())

onMounted(() => {
    getData()
    getPosts()
})

const editProfileStore = editProfile()

const {SET_FLAG} = editProfileStore

</script>

<template>
    <EditProfile />
    <div class="pt-4">
        <div class="relative">
            <div class="w-[90px] h-[90px] absolute bottom-0 left-5 overflow-hidden rounded-full">
                <img :src="user.avatar?.url ? user.avatar?.url : img" alt="">
            </div>
            <div class="h-[150px] overflow-hidden bg-[#1E2936]">

                <template v-if="user.background">
                    <img :src="user.background?.url" alt="">
                </template>

            </div>
            <div class="flex justify-end pt-3 px-5">

                <button @click="() => SET_FLAG(true)" class="px-[12px] py-3 bg-[#1E2936] rounded-full text-[#AEBBBB]">Edit Profile</button>

            </div>
        </div>
        <div class="p-5 border-b border-[#2E4052]">
            <h1 class="text-gray-50 text-4xl">{{ user.username }}</h1>
            <span class="text-gray-500">{{ user.email }}</span>
            <div class="flex items-center gap-3">
                <button class="flex gap-1 hover:underline text-gray-400 items-center">
                    <span class="text-gray-50">{{ user.followers }} </span>
                    <RouterLink to="/followers">followers</RouterLink>
                </button>
                <button class="flex gap-1 hover:underline text-gray-400 items-center">
                    <span class="text-gray-50">{{ user.following }} </span>
                    <RouterLink to="/follows">following</RouterLink>
                </button>
                <button class="flex gap-1 hover:underline text-gray-400 items-center">
                    <span v-if="posts.length > 0" class="text-gray-50">{{ posts.length }} </span>
                    <span v-else class="text-gray-50">0 </span>
                    <span>posts</span>
                </button>
            </div>
        </div>
        <div>
            <template v-if="posts.length > 0">
                <TweetCard v-for="tweet in posts" :id="id" :key="tweet._id" :type="true" :item="tweet" />
            </template>
        </div>
    </div>
</template>