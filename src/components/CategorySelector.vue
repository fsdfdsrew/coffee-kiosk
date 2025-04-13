<template>
  <div class="category-selector">
    <CategoryButton
      v-for="category in categories"
      :key="category"
      :category="category"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDrinkStore } from "@/store";
import CategoryButton from "@/components/CategoryButton.vue";

const store = useDrinkStore();

// Уникальные категории из массива напитков
const categories = computed(() => {
  const categoriesSet = new Set();
  store.state.drinks.forEach((drink) => categoriesSet.add(drink.category));
  return Array.from(categoriesSet);
});
</script>

<style scoped>
.category-selector {
  display: flex;
  overflow-x: auto;
  border-radius: var(--modal-border-radius) var(--modal-border-radius) 0 0;
  background-color: #f3f3f3;
}
</style>
