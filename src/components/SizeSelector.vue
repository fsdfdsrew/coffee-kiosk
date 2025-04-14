<template>
  <div class="size-selector">
    <button
      v-for="(size, index) in sizes"
      :key="size"
      class="size-button"
      :class="{ selected: size === selectedSize }"
      @click="$emit('select', size)"
    >
      <img
        :src="CupIcon"
        alt="cup"
        class="cup-icon"
        :style="{
          transform: `scale(${getScale(index)})`,
          opacity: size === selectedSize ? 1 : 0.4,
        }"
      />
      <span>{{ size }} мл</span>
    </button>
  </div>
</template>

<script setup>
import CupIcon from "/assets/cup.svg";

const props = defineProps({
  sizes: Array,
  selectedSize: Number,
});

const emit = defineEmits(["select"]);

const getScale = (index) => {
  const total = props.sizes.length;
  if (total === 1) return 1;

  const minScale = 0.7;
  const maxScale = 1;
  const step = (maxScale - minScale) / (total - 1);

  return minScale + step * index;
};
</script>

<style scoped>
.size-selector {
  display: flex;
  gap: var(--modal-padding);
  justify-content: center;
  flex-wrap: wrap;
}

.size-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: var(--modal-padding);
  border: none;
  border-radius: 12px;
  color: var(--button-text-color);
  background-color: #f3f3f3;
  width: 90px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.size-button.selected {
  background-color: var(--primary-color);
}

.cup-icon {
  height: 60px;
  transition: transform 0.3s ease;
  object-fit: contain;
}
</style>
