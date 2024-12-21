<script setup lang="ts">
import { Follow } from '@/services/api';
import { onMounted, ref, type Ref } from 'vue';
import img from '@/assets/img/avatar.jpg'
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const data: Ref<any[]> = ref([])
const router = useRouter();


const toast = useToast()

const getData = async () => {
    let response = await Follow.getFollowers()
    
    data.value = response
}

const goBack = () => {
    router.go(-1);
};

const handleUnfollow = async (id : any) => {
    
    let obj: any = {
        followingId : id
    }

    let response = await Follow.reject(obj)
    
    if(!response) {
        toast.error("Follow back is failed")
        return
    }

    toast.success("Follow back is successfully")

    await getData()
}

onMounted(() => getData())
</script>

<template>
    <div>
        <div class="px-5 py-3 border-b relative border-[#2E4052]">
            <button @click="goBack"
                class="bg-[#1C2733] absolute left-5 top-3 z-[999] text-white py-1 px-4 rounded-full">
                Back
            </button>
            <h1 class="text-2xl text-center text-gray-50">Followers</h1>
        </div>
        <div class="flex border-b justify-between items-center border-[#2E4052] px-5 py-3" v-for="follow in data"
            :key="follow.id">
            <div class="flex items-center gap-2">
                <div class="w-10 h-10 overflow-hidden rounded-full">
                    <img :src="follow.avatar?.url ? follow.avatar?.url : img" class="w-full" alt="">
                </div>
                <p class="text-gray-50 text-[14px]">{{ follow.username }}</p>
            </div>
            <div>
                <button @click="() => handleUnfollow(follow.id)" class="bg-gray-200 text-black px-3 py-1 rounded-full">Follow back</button>
            </div>
        </div>
    </div>
</template>