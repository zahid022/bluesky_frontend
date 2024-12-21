<script setup lang="ts">
import { ref } from 'vue';
import img from '@/assets/img/avatar.jpg'
import CommentIcon from '@/icons/CommentIcon.vue';
import LikedIcon from '@/icons/LikedIcon.vue';
import LikeIcon from '@/icons/LikeIcon.vue';
import { useToast } from 'vue-toastification';
import { Like } from '@/services/api';

let user: any = localStorage.getItem("user")
user = user ? JSON.parse(user) : ''

const props = defineProps<{
    comment: any,
    getData: Function
}>()


const activeCommentLike = ref(props.comment.likeUser.some((item: string) => item.toString() === user._id.toString()))

const toast = useToast()

const handleLike = async () => {

    let obj = {
        commentId : props.comment._id
    }

    let response = await Like.toggle(props.comment.tweetId, obj)
    if (!response) {
        toast.error("Like is failed")
        return
    }
    props.getData()
    activeCommentLike.value = !activeCommentLike.value
}

</script>

<template>
    <div class="flex px-5 py-4 border-b border-[#2e4052]">
        <div class="w-1/12 pt-3">
            <div class="w-10 h-10 overflow-hidden rounded-full">
                <img :src="comment.userId?.avatar?.url ? comment.userId?.avatar?.url : img"
                    class="w-full h-full object-cover" alt="">
            </div>
        </div>
        <div class="w-11/12 pl-3">
            <div>
                <span class="pr-3 text-gray-50 text-2xl">{{ comment.userId?.username }}</span>
                <span class="text-gray-500 text-[16px]">{{ comment.userId?.email }}</span>
            </div>
            <div>
                <p class="text-gray-200 text-xl">{{ comment.content }}</p>
            </div>

            <div class="flex gap-12 py-2">
                <button class="flex items-center gap-1">
                    <CommentIcon />
                    <span class="text-gray-50">{{ comment.commentCount }}</span>
                </button>

                <button @click="handleLike" class="flex items-center gap-1">

                    <template v-if="activeCommentLike">
                        <LikedIcon />
                    </template>

                    <template v-else>
                        <LikeIcon />
                    </template>

                    <span :class="{ 'text-gray-50': !activeCommentLike, 'text-[#ec4899]': activeCommentLike }">{{
                        comment.like }}</span>

                </button>
            </div>
        </div>
    </div>
</template>