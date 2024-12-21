<script setup>
import LoginContent from '@/components/login/LoginContent.vue';
import LoginHeader from '@/components/login/LoginHeader.vue';


</script>

<template>
    <div class="bg-[#161E27] flex justify-center min-h-screen">
        <div class="w-5/12 flex h-screen justify-center items-center">
            <div>
                <LoginHeader />
                <LoginContent />
            </div>
        </div>
    </div>
</template>
