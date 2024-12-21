<script setup lang="ts">
import { authentication } from '@/services/api';
import type { login } from '@/types/type';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const username = ref<string>('')
const password = ref<string>('')

const toast = useToast()

const router = useRouter()

const handleLogin = async () => {
    let obj: login = {
        username: username.value,
        password: password.value
    }

    let response = await authentication.login(obj)

    if (!response) {
        toast.error("Username or password is wrong")
        return
    }

    localStorage.setItem("token", JSON.stringify(response.token))

    let user = await authentication.myProfile(response.token)

    localStorage.setItem("user", JSON.stringify(user))

    router.push('/')
}

</script>

<template>
    <div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-[#161E27]">
        <form action="" class="space-y-8">
            <div class="space-y-4">
                <div>
                    <label for="username" class="block mb-2 text-sm text-gray-50">Username</label>
                    <input v-model="username" type="text" name="username" id="username" placeholder="username"
                        class="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                </div>
                <div>
                    <label for="password" class="text-sm block mb-2 text-gray-50">Password</label>
                    <input v-model="password" type="text" name="password" id="password" placeholder="*****"
                        class="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                </div>
            </div>
            <div>
                <div>
                    <button type="button" @click="handleLogin"
                        class="w-full px-8 py-3 font-semibold rounded-md dark:bg-blue-600 dark:text-gray-50">Login</button>
                </div>
                <p class="px-6 text-sm text-center dark:text-gray-600">Don't have an account yet?
                    <RouterLink to="register" class="text-blue-600">Register</RouterLink>.
                </p>
            </div>
        </form>
    </div>
</template>