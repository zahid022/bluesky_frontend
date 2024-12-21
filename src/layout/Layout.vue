<script setup lang="ts">
import LeftSidebar from '@/components/layout/LeftSidebar.vue';
import RightSidebar from '@/components/layout/RightSidebar.vue';
import CenterLogo from '@/icons/CenterLogo.vue';


</script>

<template>
    <div class="flex min-h-screen bg-[#161E27]">
        <div class="fixed px-6 z-[1] left-0 border-r py-5 border-[#2E4052] top-0 bottom-0 w-[30%]">
            <LeftSidebar />
        </div>
        <div class="w-[40%] py-5 relative z-1 left-[30%]">
            <div class="flex w-full justify-center">
                <CenterLogo />
            </div>
            <RouterView />
        </div>
        <div class="fixed px-6 z-[1] py-5 right-0 border-l border-[#2E4052] top-0 bottom-0 w-[30%]">
            <RightSidebar />
        </div>
    </div>
</template>