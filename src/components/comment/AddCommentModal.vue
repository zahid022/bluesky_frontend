<script setup lang="ts">
import img from '@/assets/img/avatar.jpg'
import type { Tweet } from '@/types/type';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Comment } from '@/services/api';
import { trendStore } from '@/stores/trend.store';
import { storeToRefs } from 'pinia';

const props = defineProps<{
    item: Tweet,
    type: string,
    addCommentFlag : boolean,
    setAddCommentFlag: Function,
}>()

const triggerParentFunction = () => {
    if (props.setAddCommentFlag) {
        props.setAddCommentFlag(false);
    }
};

const trendStores = trendStore()

const {refetch} = storeToRefs(trendStores)

const {SET_REFETCH} = trendStores

let stringUser = localStorage.getItem("user")
let user = ref(stringUser ? JSON.parse(stringUser) : {})


const content = ref('')

const toast = useToast()

const handleCreate = async () => {
    if(content.value.trim().length === 0){
        toast.error("Content is required")
        return
    }

    let obj : any = {
        tweetId : props.item._id,
        content : content.value
    }

    let response = await Comment.create(obj)
    if(!response) {
        toast.error("Comment is created failed")
        return
    }
    SET_REFETCH(!refetch.value)
    content.value = ''
    props.setAddCommentFlag(false);
}   

</script>

<template>
    <div class="bg-[#000000b1] z-[999] fixed inset-0 flex items-start justify-center pt-[100px] duration-300"
        :class="{ 'invisible opacity-0': !addCommentFlag, 'visible opacity-100': addCommentFlag }">
        <div class="duration-300 max-w-xl w-full py-3 px-4 rounded-md border border-[#2E4052] bg-[#161E27]"
            :class="{ 'translate-y-[-20px]': !addCommentFlag, 'translate-y-0': addCommentFlag }">

            <div>
                <div class="flex items-center justify-between mb-6">
                    <button @click="triggerParentFunction" class="text-blue-500 font-medium">Cancel</button>
                    <button @click="handleCreate" class="text-gray-50 bg-blue-600 px-3 py-1 rounded-full">Reply</button>
                </div>

                <template v-if="type === 'comment'"></template>

                <template v-else>
                    <div class="flex border-b pb-3 border-[#2E4052]">
                        <div class="w-1/12">
                            <div class="w-10 h-10 overflow-hidden rounded-full">
                                <img :src="item.userId.avatar?.url ? item.userId.avatar?.url : img" alt="">
                            </div>
                        </div>
                        <div class="w-11/12 pl-4">
                            <div>
                                <p class="text-gray-50 text-[20px] font-medium">{{ item.userId.username }}</p>
                            </div>
                            <div>
                                <p class="text-gray-50 text-[18px] font-light">{{ item.title }}</p>
                            </div>
                        </div>
                    </div>
                </template>

                <div class="pt-3 flex border-t border-[#2E4052]">
                    <div class="w-1/12">
                        <div class="w-10 h-10 overflow-hidden rounded-full">
                            <img :src="user.avatar?.url ? user.avatar?.url : img" alt="">
                        </div>
                    </div>
                    <div class="w-11/12 pl-4">
                        <textarea v-model="content"
                            class="bg-transparent block w-full outline-none text-xl text-gray-200"
                            placeholder="What's up?"></textarea>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>