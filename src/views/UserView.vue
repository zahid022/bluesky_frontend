<script setup lang="ts">
import { Follow, tweet, User } from '@/services/api';
import { onMounted, ref, watch, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import img from '@/assets/img/avatar.jpg'
import TweetCard from '@/components/tweet/TweetCard.vue';
import PlusIcon from '@/icons/PlusIcon.vue';
import PendingIcon from '@/icons/PendingIcon.vue';
import CheckIcon from '@/icons/CheckIcon.vue';
import { useToast } from 'vue-toastification';
import { trendStore } from '@/stores/trend.store';
import { storeToRefs } from 'pinia';

const route = useRoute();

const id = route.params.id

const user: Ref<any> = ref({})
const posts: Ref<any[]> = ref([])
const message = ref('')

const toast = useToast()

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

watch(() => route.params.id, () => location.reload())

const checkFollow = async () => {

    let response = await Follow.check(id)
    message.value = response
}

const handleFollow = async () => {
    if (message.value == "Follow") {
        let obj: any = {
            followedId: id
        }

        let response = await Follow.followRequest(obj)
        if (!response) {
            toast.error("Follow is failed")
            return
        }
        getData()
        checkFollow()
    }
}


onMounted(() => {
    getData()
    getPosts()
    checkFollow()
})

</script>

<template>
    <div class="pt-4">
        <div class="relative">
            <div class="w-[90px] h-[90px] absolute bottom-0 left-5 overflow-hidden rounded-full">
                <img :src="user.avatar?.url ? user.avatar?.url : img" alt="">
            </div>
            <div class="h-[150px] overflow-hidden bg-[#1E2936]">

                <template v-if="user.background?.url">
                    <img :src="user.background?.url" alt="">
                </template>

            </div>
            <div class="flex justify-end pt-3 px-5">

                <button @click="handleFollow"
                    :class="{ 'bg-[#2563eb]': message === 'Follow', 'bg-gray-700': message === 'Pending', 'bg-lime-600': message === 'Following' }"
                    class="px-[12px] flex items-center gap-1 py-1 rounded-full text-[#fff]">
                    <PlusIcon v-if="message === 'Follow'" />
                    <PendingIcon v-else-if="message === 'Pending'" />
                    <CheckIcon v-else />
                    <span>{{ message }}</span>
                </button>

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
                <TweetCard v-for="tweet in posts" :id="id as string" :key="tweet._id" :item="tweet" />
            </template>
        </div>
    </div>
</template>