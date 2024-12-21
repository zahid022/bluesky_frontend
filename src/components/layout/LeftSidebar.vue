<script setup lang="ts">
import img from '@/assets/img/avatar.jpg'
import AddPostIcon from '@/icons/AddPostIcon.vue';
import HomeIcon from '@/icons/HomeIcon.vue';
import ProfileIcon from '@/icons/ProfileIcon.vue';
import { ref } from 'vue';
import AddPostModal from '../AddPostModal.vue';
import { addPost } from '@/stores/addPost.tweet';
import NotificationIcon from '@/icons/NotificationIcon.vue';
let stringUser = localStorage.getItem("user")
let user = ref(stringUser ? JSON.parse(stringUser) : {})

const store = addPost()

const {SET_FLAG} = store

const handleSignOut = () => {
    localStorage.clear()
    location.reload()
}

</script>

<template>
    <AddPostModal  />
    <div class="flex justify-end">
        <div>
            <ul>
                <li class="mb-8 px-4">
                    <div class="w-12 h-12 rounded-full overflow-hidden">
                        <RouterLink to="/profile">
                            <img :src="user.avatar?.url ? user.avatar?.url : img" class="w-full" alt="">
                        </RouterLink>
                    </div>
                </li>
                <li class="mb-4 px-4 py-2 hover:bg-gray-500 rounded-md duration-300">
                    <div class="flex items-center gap-6">
                        <HomeIcon />
                        <RouterLink to="/" class="text-gray-50 text-[18px] font-medium">Home</RouterLink>
                    </div>
                </li>
                <li class="mb-4 px-4 py-2 hover:bg-gray-500 rounded-md duration-300">
                    <div class="flex items-center gap-6">
                        <ProfileIcon />
                        <RouterLink to="/profile" class="text-gray-50 text-[18px] font-medium">Profile</RouterLink>
                    </div>
                </li>
                <li class="mb-4 px-4 py-2 hover:bg-gray-500 rounded-md duration-300">
                    <div class="flex items-center gap-6">
                        <NotificationIcon />
                        <RouterLink to="/notification" class="text-gray-50 text-[18px] font-medium">Notifications</RouterLink>
                    </div>
                </li>
                <li class="mb-4 px-4">
                    <div class="flex items-center gap-6">
                        <button @click="handleSignOut" class="text-[18px] cursor-pointer text-red-600 font-medium">Sign out</button>
                    </div>
                </li>
                <li class="px-4">
                    <div>
                        <button @click="() => SET_FLAG(true)" class="bg-blue-600 flex gap-3 items-center text-white px-8 py-3 rounded-[50px]">
                            <AddPostIcon />
                            <span>
                                New Post
                            </span>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>