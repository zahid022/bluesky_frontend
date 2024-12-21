<script setup lang="ts">
import LoginHeader from '@/components/login/LoginHeader.vue';
import RegisterContent from '@/components/login/RegisterContent.vue';


</script>

<template>
    <div class="bg-[#161E27] flex justify-center min-h-screen">
        <div class="w-5/12 flex h-screen justify-center items-center">
            <div>
                <LoginHeader />
                <RegisterContent />
            </div>
        </div>
    </div>
</template>