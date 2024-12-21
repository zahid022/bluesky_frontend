<script setup lang="ts">
import type { Tweet } from '@/types/type';
import img from '@/assets/img/avatar.jpg'
import CommentIcon from '@/icons/CommentIcon.vue';
import ReplyIcon from '@/icons/ReplyIcon.vue';
import LikeIcon from '@/icons/LikeIcon.vue';
import { Like, tweet } from '@/services/api';
import { useToast } from 'vue-toastification';
import { trendStore } from '@/stores/trend.store';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import LikedIcon from '@/icons/LikedIcon.vue';
import timeAgo from '@/utils/time.util';
import AddCommentModal from '../comment/AddCommentModal.vue';
import TrashIcon from '@/icons/TrashIcon.vue';

const props = defineProps<{
    item: Tweet,
    type?: boolean,
    id? : string
}>()

const refetchStore = trendStore()

let user: any = localStorage.getItem("user")
user = user ? JSON.parse(user) : ''

let flag = props.item.likeUser.some(element => element === user._id)

const activeLike = ref(flag)

const { refetch } = storeToRefs(refetchStore)

const { SET_REFETCH } = refetchStore

const toast = useToast()

let time = timeAgo(props.item.createdAt)

const showTime = ref(time)

const handleLike = async () => {
    let response = await Like.toggle(props.item._id)
    if (!response) {
        toast.error("Like is failed")
        return
    }
    SET_REFETCH(!refetch.value)
    activeLike.value = !activeLike.value
}

const addCommentFlag = ref(false)

const handleDelete = async () => {
    if(props.id !== props.item.userId.id){
        toast.error("Unauthorized")
        return
    }

    let response = await tweet.deleteTweet(props.item._id)
    
    if(!response) {
        toast.error("Tweet deleted is failed")
        return
    }

    toast.success("Tweet is deleted successfully")
    SET_REFETCH(!refetch.value)
}


const SET_ADD_COMMENT_FLAG = (arg: boolean) => addCommentFlag.value = arg
</script>

<template>
    <AddCommentModal :type="'tweet'" :addCommentFlag="addCommentFlag" :setAddCommentFlag="SET_ADD_COMMENT_FLAG"
        :item="item" />
    <div class="border-b border-[#2E4052] py-2 px-5">
        <div class="flex">
            <div class="w-1/12">
                <div class="w-8 h-8 overflow-hidden rounded-full">
                    <img :src="item.userId.avatar?.url ? item.userId.avatar?.url : img" alt="">
                </div>
            </div>
            <div class="w-11/12">
                <div>
                    <div>
                        <p class="text-gray-50 text-[20px] font-medium">
                            <RouterLink :to="`/user/${item.userId.id ? item.userId.id : user._id}`">{{
                                item.userId.username }}</RouterLink>
                            <span class="text-[12px] pl-1 text-gray-400">{{ showTime }}</span>
                        </p>
                    </div>
                    <div class="mb-4">
                        <RouterLink :to="`/post/${item._id}`" class="text-gray-50 text-[18px] font-light">{{ item.title
                            }}</RouterLink>
                    </div>

                    <template v-if="item.media">
                        <div class="h-56 mb-4 overflow-hidden">
                            <img class="w-full h-full object-cover" :src="item.media.url" alt="">
                        </div>
                    </template>


                    <div class="flex gap-12">
                        <button @click="() => SET_ADD_COMMENT_FLAG(true)" class="flex items-center gap-1">
                            <CommentIcon />
                            <span class="text-gray-50">{{ item.comment }}</span>
                        </button>
                        <button class="flex items-center gap-1">
                            <ReplyIcon />
                            <span class="text-gray-50">{{ item.reply }}</span>
                        </button>
                        <button @click="handleLike" class="flex items-center gap-1">

                            <template v-if="activeLike">
                                <LikedIcon />
                            </template>

                            <template v-else>
                                <LikeIcon />
                            </template>

                            <span :class="{ 'text-gray-50': !activeLike, 'text-[#ec4899]': activeLike }">{{ item.like
                                }}</span>
                        </button>

                        <template v-if="type">
                            <button @click="handleDelete" class="flex items-center gap-1">
                                <TrashIcon />
                                <span class="text-gray-50">Delete tweet</span>
                            </button>
                        </template>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>