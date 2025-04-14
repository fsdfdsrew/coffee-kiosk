<template>
  <div
    class="category-button"
    :class="{ active: isActive }"
    @click="selectCategory"
  >
    <div style="position: relative">
      <img
        :src="categoryImage"
        :alt="category"
        class="category-image"
        :class="{ grayscale: !isActive }"
      />
      <div v-if="isActive" :style="circleStyle"></div>
    </div>
    <h3>{{ store.getCategoryLabel(category) }}</h3>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDrinkStore } from "@/store";

const props = defineProps({
  category: String,
});

const store = useDrinkStore();

const isActive = computed(
  () => store.state.selectedCategory === props.category
);

const categoryImage = computed(
  () => `/img/category/category-img-${props.category}.webp`
);

const selectCategory = () => {
  store.setCategory(props.category);
};

const circleStyle = computed(() => {
  if (!isActive.value) return {};
  return {
    backgroundColor: store.getCategoryColor(props.category),
    borderRadius: "50%",
    position: "absolute",
    top: "63%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
  };
});
</script>

<style scoped>
.category-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 1;
  transition: filter 0.3s;
}

.category-button h3 {
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}

.category-button.active {
  box-shadow: 0 0 1px 1px #d8d8d8;
  background-color: var(--modal-content-bg);
}

.category-image.grayscale {
  filter: grayscale(100%);
}
</style>
