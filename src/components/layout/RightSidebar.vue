<script setup lang="ts">
import SearchIcon from '@/icons/SearchIcon.vue';
import { User } from '@/services/api';
import { homeStore } from '@/stores/home.store';
import { storeToRefs } from 'pinia';
import { ref, type Ref } from 'vue';
import img from '@/assets/img/avatar.jpg'
import { useRouter } from 'vue-router';

const store = homeStore()

const { flag } = storeToRefs(store)

const { SET_FLAG } = store

const searchValue = ref('')
const data: Ref<any[]> = ref([])

const getUser = async () => {
    if (searchValue.value.length === 0) {
        data.value = []
        return
    }

    let obj: any = {
        search: searchValue.value
    }

    let response = await User.userSearch(obj)
    
    data.value = response
}

const router = useRouter();

const manualRouter = (id : any) => {
    router.push({ name: 'userDetail', params: { id: id } });
    data.value = []
    searchValue.value = ''
}

</script>

<template>
    <div class="w-9/12">
        <div class="pb-6">
            <div class="flex gap-5 items-center pl-2 pr-5 rounded-md bg-[#1E2936]">
                <div>
                    <SearchIcon />
                </div>
                <input v-model="searchValue" @input="getUser" type="text" placeholder="Search..."
                    class="block py-2 text-gray-400 outline-none bg-transparent w-full">
            </div>
        </div>

        <template v-if="data.length > 0">
            <div class="border mb-6 rounded-md border-[#2E4052]">
                <div class="border-b border-[#2E4052] px-3 py-2">
                    <p class="text-gray-50">Search for "{{ searchValue }}"</p>
                </div>
                <div>
                    <div v-for="(user, index) in data" :key="user.id">
                        <button :class="{'border-b' : index !== data.length - 1}" class="block border-[#2e4052] px-3 py-2 w-full" @click="() => manualRouter(user.id)">
                            <div class="flex items-center">
                                <div class="w-2/12">
                                    <div class="w-7 h-7 overflow-hidden rounded-full">
                                        <img :src="user.avatar?.url ? user.avatar?.url : img" class="w-full" alt="">
                                    </div>
                                </div>
                                <div class="w-10/12">
                                    <p class="text-gray-50 text-start">{{ user.username }}</p>
                                    <p class="text-gray-400 text-start">{{ user.email }}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </template>

        <div class="py-6 border-t border-b border-[#2E4052]">
            <ul>
                <li class="mb-4">
                    <button @click="() => SET_FLAG(true)" :class="{ 'text-white': flag, 'text-gray-400': !flag }"
                        class="text-[18px]" to="/">Discover</button>
                </li>
                <li>
                    <button @click="() => SET_FLAG(false)" :class="{ 'text-white': !flag, 'text-gray-400': flag }"
                        class="text-[18px]" to="/">Following</button>
                </li>
            </ul>
        </div>
        <div class="pt-6">
            <div class="text-center text-gray-400">
                Copyright &copy; {{ new Date().getFullYear() }}
            </div>
        </div>
    </div>
</template>