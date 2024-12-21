<script setup lang="ts">
import { addPost } from '@/stores/addPost.tweet';
import { storeToRefs } from 'pinia';
import img from '@/assets/img/avatar.jpg';
import type { User } from '@/types/type';
import UploadIcon from '@/icons/UploadIcon.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { imageUpload, tweet } from '@/services/api';
import { trendStore } from '@/stores/trend.store';

const store = addPost();

const imageObj : any = ref({})
const content = ref('')

const refetchStore = trendStore()

const {refetch} = storeToRefs(refetchStore)

const {SET_REFETCH} = refetchStore

const { flag } = storeToRefs(store);

const { SET_FLAG } = store;

const defaultUser: User = {
    username: '',
    email: '',
    avatar: '',
    background: '',
    followers: 0,
    following: 0,
    role: 'public'
};

const toast = useToast()

let user: any = localStorage.getItem('user')
    ? (JSON.parse(localStorage.getItem('user') as string) as User)
    : defaultUser;


const upload = async (event: Event) => {
    const formData = new FormData()
    const input = event.target as HTMLInputElement;
    if (input.files) {
        formData.append("image", input.files[0])
        try {
            let result = await imageUpload.upload(formData)

            if (result) {
                imageObj.value = { id: result._id, url: result.url }
                toast.success("Image upload is successfully")
            }
            else {
                toast.error("Images upload is failed")
            }
        } catch {
            return
        }
    }
}

const handleCreate = async () => {
    if(content.value.trim().length === 0){
        toast.error("Content is required")
        return
    }

    let obj : any = {
        title : null
    }

    obj.title = content.value
    if(imageObj.value.id){
        obj.media = imageObj.value.id 
    }

    let response = await tweet.create(obj)

    if(!response) {
        toast.error("Tweet creat is failed")
        return
    }

    toast.success("Tweet created is successfully")
    SET_REFETCH(!refetch.value)
    imageObj.value = {}
    content.value = ''
    SET_FLAG(false)
}

</script>

<template>
    <div :class="{ 'invisible opacity-0': !flag, 'visible opacity-100': flag }"
        class="fixed z-[999] items-start flex justify-center pt-[100px] duration-300 inset-0 bg-[#000000a2]">
        <div class="duration-300 max-w-xl w-full py-3 px-4 rounded-md border border-[#2E4052] bg-[#161E27]"
            :class="{ 'translate-y-[-20px]': !flag, 'translate-y-0': flag }">
            <div>
                <div class="flex items-center relative z-[999] justify-between mb-6">
                    <button @click="() => SET_FLAG(false)" class="text-blue-500 font-medium">Cancel</button>
                    <button @click="handleCreate" class="text-gray-50 bg-blue-600 px-3 py-1 rounded-full">Post</button>
                </div>
                <div class="flex mb-4 flex-wrap">
                    <div class="w-1/12">
                        <div class="w-10 h-10 rounded-full overflow-hidden">
                            <img :src="user.avatar?.url ? user.avatar?.url : img" alt="">
                        </div>
                    </div>
                    <div class="w-11/12 pl-3">
                        <textarea v-model="content" class="bg-transparent block w-full outline-none text-xl text-gray-200"
                            placeholder="What's up?"></textarea>
                    </div>

                    <template v-if="imageObj.url">
                        <div class="w-10 h-10 relative">
                            <button @click="() => imageObj = {}" class="bg-red-600 text-white absolute top-[-5px] right-[-5px] h-4 w-4 rounded-full flex items-center justify-center">-</button>
                            <img :src="imageObj.url" class="w-full rounded-sm h-full" alt="">
                        </div> 
                    </template>

                </div>
                <div class="border-t border-[#2e4052] pt-2">
                    <button class="relative cursor-pointer">
                        <input @input="upload" type="file" class="absolute inset-0 opacity-0 z-[999] cursor-pointer" />
                        <UploadIcon />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
