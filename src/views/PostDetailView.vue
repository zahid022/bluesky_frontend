<script setup lang="ts">
import { Comment, Like, tweet } from '@/services/api';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import img from '@/assets/img/avatar.jpg'
import formatDate from '@/utils/formatTime.utils';
import CommentIcon from '@/icons/CommentIcon.vue';
import ReplyIcon from '@/icons/ReplyIcon.vue';
import LikeIcon from '@/icons/LikeIcon.vue';
import LikedIcon from '@/icons/LikedIcon.vue';
import { useToast } from 'vue-toastification';
import CommentCard from '@/components/comment/CommentCard.vue';

const route = useRoute()
const router = useRouter()

let user: any = localStorage.getItem("user")
user = user ? JSON.parse(user) : ''

const data: Ref<any> = ref({})
const comments: Ref<any[]> = ref([])
const time = ref('')
const activeLike = ref(false)

const getData = async () => {
    const id = route.params.id
    let response = await tweet.tweetById(id)
    data.value = response
    activeLike.value = response.likeUser.some((item: string) => item.toString() === user._id.toString())
    time.value = formatDate(response.createdAt)
    let result = await getComments(id)
    comments.value = result
}

const getComments = async (id: any) => {
    let response = await Comment.byTweet(id)
    return response
}

onMounted(() => getData())

const goBack = () => {
    router.go(-1);
};

const toast = useToast()

const handleLike = async (tweetId: any) => {
    let response = await Like.toggle(tweetId)
    if (!response) {
        toast.error("Like is failed")
        return
    }
    getData()
    activeLike.value = !activeLike.value
}



</script>

<template>
    <div>
        <div class="relative border-b border-[#2E4052] py-2 px-5">
            <button @click="goBack"
                class="bg-gray-800 text-gray-50 absolute left-5 top-2 rounded-full p-1 px-3">Back</button>
            <h1 class="text-white text-2xl text-center">Post</h1>
        </div>
        <div class="py-2 px-5 border-b border-[#2e4052]">
            <div class="flex gap-5 mb-4 items-center">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img :src="data.userId?.avatar?.url ? data.userId.avatar.url : img"
                        class="w-full h-full object-cover" alt="">
                </div>
                <div>
                    <p class="text-gray-50 font-medium text-xl">{{ data.userId?.username }}</p>
                    <p class="text-gray-500 text-[14px]">{{ data.userId?.email }}</p>
                </div>
            </div>
            <div class="border-b border-[#2e4052] pb-4">
                <p class="text-gray-50 text-3xl">{{ data.title }}</p>

                <template v-if="data.media">
                    <img :src="data.media.url" class="w-full object-cover" alt="">
                </template>
            </div>
            <div class="py-2 border-b border-[#2e4052]">
                <p class="text-gray-50">{{ time }}</p>
            </div>

            <div class="flex gap-12 py-2">
                <button class="flex items-center gap-1">
                    <CommentIcon />
                    <span class="text-gray-50">{{ data.comment }}</span>
                </button>
                <button class="flex items-center gap-1">
                    <ReplyIcon />
                    <span class="text-gray-50">{{ data.reply }}</span>
                </button>
                <button @click="() => handleLike(data._id)" class="flex items-center gap-1">

                    <template v-if="activeLike">
                        <LikedIcon />
                    </template>

                    <template v-else>
                        <LikeIcon />
                    </template>

                    <span :class="{ 'text-gray-50': !activeLike, 'text-[#ec4899]': activeLike }">{{ data.like }}</span>
                </button>
            </div>
        </div>
        <div>
            <template v-if="comments.length > 0">
                <CommentCard v-for="comment in comments" :key="comment.id" :get-data="getData" :comment="comment" />
            </template>
        </div>
    </div>
</template>