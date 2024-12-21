<script setup lang="ts">
import { Follow } from '@/services/api';
import { onMounted, ref, type Ref } from 'vue';
import img from '@/assets/img/avatar.jpg'
import RejectIcon from '@/icons/RejectIcon.vue';
import AccepIcon from '@/icons/AccepIcon.vue';
import { useToast } from 'vue-toastification';

const data : Ref<any[]> = ref([])

const getData = async () => {
    let response = await Follow.notifications()
    console.log(response)
    data.value = response
}

const toast = useToast()

const handleAccept = async (id : any) => {
    let obj = {
        followingId : id
    }

    let response = await Follow.accept(obj)

    if(!response) {
        toast.error("Accept is failed")
        return
    }

    toast.success('Accept is successfully')
    getData()
}

const handleReject = async (id : any) => {
    let obj = {
        followingId : id
    }

    let response = await Follow.reject(obj)

    if(!response) {
        toast.error("Reject is failed")
        return
    }

    toast.success('Reject is successfully')
    getData()
}

onMounted(() => getData())
</script>

<template>
    <div>
        <div class="py-4 border-b border-[#2E4052]">
            <h1 class="text-gray-50 text-2xl text-center">Notifications</h1>
        </div>
        <div>
            <template v-if="data.length > 0">
                <div v-for="not in data" :key="not._id" class="px-5 border-b border-[#2E4052] py-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <div class="w-10 h-10 overflow-hidden mb-3 rounded-full">
                                <img :src="not.followingId.avatar?.url ? not.followingId.avatar?.url : img" alt="">
                            </div>
                            <div>
                                <p class="text-gray-50">{{ not.followingId.username }} wants to follow you</p>
                            </div>
                        </div>
                        <div>
                            <div class="flex gap-3">
                                <button @click="() => handleReject(not.followingId.id)" class="p-2 rounded-full border border-red-600">
                                    <RejectIcon />
                                </button>
                                <button @click="() => handleAccept(not.followingId.id)" class="p-2 rounded-full border border-lime-600">
                                    <AccepIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>