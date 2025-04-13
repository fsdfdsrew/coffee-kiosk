<template>
  <div
    class="app-title-container"
    :style="{
      backgroundColor: computedbackgroundColor,
    }"
  >
    <h1>Выбор напитков</h1>
    <img :src="`/assets/Vector.webp`" />
    <div
      class="app-title--completion"
      :style="{
        backgroundColor: computedbackgroundColor,
      }"
    ></div>
  </div>
  <div class="app-panel">
    <CategorySelector />
    <div class="drink-container">
      <div class="title-container">
        <h1>{{ store.getCategoryLabel(store.state.selectedCategory) }}</h1>
        <div :style="circleStyle"></div>
      </div>
      <div class="drinks-grid-wrapper">
        <div class="drinks-grid">
          <div v-for="drink in store.filteredDrinks" :key="drink.id">
            <DrinkCard :drink="drink" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="store.state.isLoading">Загружаем напитки...</div>

  <DrinkModal
    v-if="store.state.selectedDrink"
    :drink="store.state.selectedDrink"
    :close="() => store.selectDrink(null)"
  />
</template>

<script setup>
import { computed } from "vue";
import { useDrinkStore } from "@/store";
import CategorySelector from "@/components/CategorySelector.vue";
import DrinkCard from "@/components/DrinkCard.vue";
import DrinkModal from "@/components/DrinkModal.vue";

const store = useDrinkStore();

const circleStyle = computed(() => {
  return {
    backgroundColor: store.getCategoryColor(store.state.selectedCategory),
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "4%",
    transform: "translate(-50%, -50%)",
    width: "60px",
    height: "60px",
  };
});

const computedbackgroundColor = computed(() =>
  store.getCategoryColor(store.state.selectedCategory)
);
</script>

<style scoped>
.app-title-container {
  position: relative;
  padding: 20px var(--modal-padding);
}

.app-title-container h1 {
  position: relative;
  text-align: left;
  z-index: 1;
}

.app-title-container img {
  position: absolute;
  top: 50%;
  right: 10%;
  height: 400%;
  transform: translate(0%, -50%);
  opacity: 0.5;
}

.app-title--completion {
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 100%;
}

.app-panel {
  position: relative;
  z-index: 2;
  height: 100%; /* Всегда полностью заполняет #app */
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.drink-container {
  flex: 1;
  padding: var(--modal-padding) 20px 0 var(--modal-padding);
  background-color: var(--modal-content-bg);
  position: relative;
  box-shadow: 0 -0px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.title-container {
  position: relative;
  margin: 20px 0;
}

.title-container h1 {
  text-align: left;
  position: relative;
  z-index: 1;
}

.drinks-grid-wrapper {
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.drinks-grid-wrapper::-webkit-scrollbar {
  display: none;
}

.drinks-grid {
  display: grid;
  overflow-y: auto;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding-bottom: 20px;
}
</style>
