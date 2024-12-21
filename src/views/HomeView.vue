<script setup lang="ts">
import Discover from '@/components/home/Discover.vue';
import Following from '@/components/home/Following.vue';
import { homeStore } from '@/stores/home.store';
import { storeToRefs } from 'pinia';


const store = homeStore()

const { flag } = storeToRefs(store)

const { SET_FLAG } = store

</script>

<template>
  <main>

    <div class="sticky border-b border-[#2E4052] top-0 left-0 right-0">
      <div class="flex gap-6 items-center pt-4 px-5 bg-[#161E27]">
        <button @click="() => SET_FLAG(true)" :class="{'text-white border-blue-500' : flag , 'text-gray-400 border-transparent' : !flag}" class="text-gray-400 border-b-2 pb-3">Discover</button>
        <button @click="() => SET_FLAG(false)" :class="{'text-white border-blue-500' : !flag , 'text-gray-400 border-transparent' : flag}" class="text-gray-400 border-b-2 pb-3">Following</button>
      </div>
    </div>

    <template v-if="flag">
      <Discover />
    </template>

    <template v-else>
      <Following />
    </template>

  </main>
</template>
