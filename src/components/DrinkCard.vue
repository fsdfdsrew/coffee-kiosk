<template>
  <div class="drink-card" @click="selectDrink">
    <img :src="`/img/drinks/${drink.image}`" :alt="drink.name" />
    <h4>{{ drink.name }}</h4>
    <p>от {{ drink.price }}₽</p>
  </div>
</template>

<script setup>
import { useDrinkStore } from "@/store";

const props = defineProps({
  drink: Object,
});

const store = useDrinkStore();

const selectDrink = () => {
  store.selectDrink(props.drink);
};
</script>

<style scoped>
.drink-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: 0.5px solid #d8d8d8;
  outline-offset: -1px;
  border-radius: var(--modal-border-radius);
  cursor: pointer;
}

.drink-card img {
  width: 120px;
  height: 120px;
}

.drink-card h4 {
  font-size: 14px;
}

.drink-card p {
  font-size: large;
  font-weight: 600;
}
</style>
