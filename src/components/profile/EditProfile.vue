<script setup lang="ts">
import UploadImageIcon from '@/icons/UploadImageIcon.vue';
import { editProfile } from '@/stores/edit.profile';
import { storeToRefs } from 'pinia';
import { onMounted, ref, type Ref } from 'vue';
import img from '@/assets/img/avatar.jpg'
import { imageUpload, User } from '@/services/api';
import { useToast } from 'vue-toastification';

let userLocal: any = localStorage.getItem("user")
userLocal = userLocal ? JSON.parse(userLocal) : ''

const user: any = ref({})

const getData = () => {
    user.value = userLocal
}

onMounted(() => getData())

const store = editProfile()

const { flag } = storeToRefs(store)

const { SET_FLAG } = store

const toast = useToast()

const newPP : Ref<any> = ref({})
const newBG : Ref<any> = ref({})
const newUsername = ref('')
const newRole = ref('')

const uploadImage = async (event: Event, type: string) => {
    const formData = new FormData()
    const input = event.target as HTMLInputElement;
    if (input.files) {
        formData.append("image", input.files[0])
        try {
            let result: any = await imageUpload.upload(formData)
            
            if (result) {
                toast.success("Image upload is successfully")

                if(type === 'bg'){
                    newBG.value = {url : result.url, id : result._id}
                }else{
                    newPP.value = {url : result.url, id : result._id}
                }
            }
            else {
                toast.error("Images upload is failed")
            }
        } catch {
            return
        }
    }
}

const handleEdit = async () => {
    if(newUsername.value.length > 0 && newUsername.value.length < 3){
        toast.error("username min 3 length")
        return
    }

    let obj : any = {}

    if(newBG.value.id){
        obj.background = newBG.value.id
    }

    if(newPP.value.id){
        obj.avatar = newPP.value.id
    }

    if(newUsername.value.length > 3){
        obj.username = newUsername.value
    }

    if(newRole.value !== ''){
        obj.role = newRole.value
    }

    let response = await User.userUpdate(obj)

    if(!response){
        toast.error("User update is failed")
        return
    }

    localStorage.removeItem("user")

    localStorage.setItem("user", JSON.stringify(response))

    location.reload()
}

</script>

<template>
    <div :class="{ 'invisible opacity-0': !flag, 'visible opacity-100': flag }"
        class="fixed duration-300 inset-0 z-[999] bg-[#000000b7] flex justify-center items-center">
        <div class="duration-300 max-w-xl w-full py-3 px-4 rounded-md border border-[#2E4052] bg-[#161E27]"
            :class="{ 'translate-y-[-20px]': !flag, 'translate-y-0': flag }">
            <div>
                <div>
                    <h2 class="text-gray-50 text-center mb-4 text-2xl font-medium">Edit my profile</h2>
                </div>
                <div class="relative mb-16">
                    <div class="h-[150px] overflow-hidden relative bg-[#1E2936]">
                        
                        <template v-if="newBG.url">
                            <img class="object-cover w-full h-full" :src="newBG.url" alt="">
                        </template>

                        <template v-else-if="user.background">
                            <img class="object-cover w-full h-full" :src="user.background?.url" alt="">
                        </template>

                        <input @input="(e) => uploadImage(e, 'bg')" type="file"
                            class="absolute inset-0 cursor-pointer opacity-0">
                        <div class="absolute right-4 bottom-3">
                            <UploadImageIcon />
                        </div>
                    </div>
                    <div class="absolute  bottom-[-20px] left-4">
                        <div class="relative">
                            <div class="overflow-hidden rounded-full w-20 h-20">

                                <template v-if="!newPP.url">
                                    <img class="w-full h-full object-cover" :src="user.avatar?.url ? user.avatar?.url : img" alt="">
                                </template>

                                <template v-else>
                                    <img class="w-full h-full object-cover" :src="newPP.url" alt="">
                                </template>

                            </div>
                            <input @input="(e) => uploadImage(e, 'pp')" type="file"
                                class="absolute inset-0 opacity-0 cursor-pointer z-[999]">
                            <div class="absolute p-[6px] rounded-full bg-[#1E2936] right-[-4px] bottom-1">
                                <UploadImageIcon />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-8">
                    <label class="text-gray-50 pl-1 text-[14px] font-medium mb-1 block" for="username">Display
                        name</label>
                    <input v-model="newUsername" type="text" placeholder="e.g. Alice Roberts" id="username"
                        class="block rounded-md text-gray-50 bg-transparent outline-none py-2 px-4 w-full border border-[#2e4052]">
                </div>

                <div class="mb-8">
                    <label class="text-gray-50 pl-1 text-[14px] font-medium mb-1 block" for="role">Role</label>
                    <select v-model="newRole" id="role"
                        class="block rounded-md text-white bg-transparent outline-none py-2 px-4 w-full border border-[#2e4052]">
                        <option class="!bg-gray-800" :value="user.role">Choose role</option>
                        <option class="!bg-gray-800" value="public">Public</option>
                        <option class="!bg-gray-800" value="private">Private</option>
                    </select>
                </div>

                <div class="z-[999]">
                    <button @click="handleEdit" class="bg-blue-500 text-white py-2 rounded-full block w-full mb-3 font-medium">Save</button>
                    <button @click="() => SET_FLAG(false)"
                        class="text-gray-50 block w-full text-center px-3 py-1 rounded-full">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>