<script setup lang="ts">
import { authentication } from '@/services/api';
import type { register } from '@/types/type';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const toast = useToast()
const email = ref <string> ('')
const username = ref <string> ('')
const password = ref <string> ('')

const router  = useRouter()

const handleRegister = async () => {
    let obj : register = {
        email : email.value,
        username : username.value,
        password : password.value
    }

    let response = await authentication.register(obj)
    if(!response){
        toast.error("Register is failed")
        return
    }
    toast.success("Register is succeesfully")
    router.push("login")
}

</script>

<template>
    <div class="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-[#161E27]">
        <form action="" class="space-y-8 min-w-[350px]">
            <div class="space-y-4">
                <div>
                    <label for="email" class="block mb-2 text-sm text-gray-50">Email</label>
                    <input v-model="email" type="email" name="email" id="email" placeholder="email"
                        class="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                </div>
                <div>
                    <label for="username" class="block mb-2 text-sm text-gray-50">Username</label>
                    <input type="text" v-model="username" name="username" id="username" placeholder="username"
                        class="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                </div>
                <div>
                    <label for="password" class="text-sm block mb-2 text-gray-50">Password</label>
                    <input type="text" v-model="password" name="password" id="password" placeholder="*****"
                        class="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800">
                </div>
            </div>
            <div>
                <div>
                    <button @click="handleRegister" type="button"
                        class="w-full px-8 py-3 font-semibold rounded-md dark:bg-blue-600 dark:text-gray-50">Register</button>
                </div>
                <p class="px-6 text-sm text-center dark:text-gray-600">Do you have account?
                    <RouterLink to="login" class="text-blue-600">Login</RouterLink>.
                </p>
            </div>
        </form>
    </div>
</template>