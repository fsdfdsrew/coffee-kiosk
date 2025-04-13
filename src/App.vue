<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useDrinkStore } from "@/store";
import { NConfigProvider, NMessageProvider } from "naive-ui";

const store = useDrinkStore();

onMounted(async () => {
  await store.fetchDrinksData();
});
</script>
