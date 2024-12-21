<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';

import Layout from './layout/Layout.vue';
import Login from './layout/Login.vue';

const layout = shallowRef(Layout);
const route = useRoute();

watch(
  () => route.meta.layout,
  (value) => {
    switch (value) {
      case 'Layout':
        layout.value = Layout;
        break;
      default:
        layout.value = Login;
        break;
    }
  },
  { immediate: true }
);
</script>

<template>
  <component :is="layout" />
</template>
