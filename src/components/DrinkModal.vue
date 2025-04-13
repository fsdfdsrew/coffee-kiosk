<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="button-container">
        <button @click="close">×</button>
      </div>

      <div class="header-container">
        <img :src="`/img/drinks/${drink.image}`" :alt="drink.name" />
        <h2>{{ drink.name }}</h2>
      </div>

      <SizeSelector
        :sizes="drink.sizes"
        :selectedSize="store.state.selectedSize"
        @select="store.selectSize"
      />

      <div class="container syrup-container">
        <button class="syrup-toggle" @click="isSyrupModalOpen = true">
          Хотите сироп?
        </button>
      </div>

      <button class="pay-button" @click="$router.push('/payment-selection')">
        <p>Оплатить</p>
        <p class="pay-button-total">{{ store.getFinalPrice }}₽</p>
      </button>
    </div>

    <SyrupModal v-if="isSyrupModalOpen" @close="isSyrupModalOpen = false" />
  </div>
</template>

<script setup>
import { useDrinkStore } from "@/store";
import { ref, defineProps } from "vue";
import SyrupModal from "@/components/SyrupModal.vue";
import SizeSelector from "@/components/SizeSelector.vue";

const props = defineProps({
  drink: {
    type: Object,
    required: true,
  },
  close: {
    type: Function,
    required: true,
  },
});

const store = useDrinkStore();
const isSyrupModalOpen = ref(false);
</script>

<style scoped>
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.modal-content {
  background: #fff;
  border-radius: var(--modal-border-radius) var(--modal-border-radius) 0 0;
  width: 100%;
  max-height: 80%;
  display: grid;
  grid-template-rows: 1fr 3fr 2fr 1fr 1fr;
  gap: var(--modal-padding);
  padding: 0 var(--modal-padding) var(--modal-padding) var(--modal-padding);
  animation: slideUp 0.3s ease-out;
  position: relative;
  overflow-y: auto;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.button-container {
  display: flex;
  justify-content: center;
}

.button-container button {
  background-color: var(--secondary-color);
  color: #d3d3d3;
  outline: 0.5px solid #d8d8d8;
  outline-offset: -1px;
  border-radius: 0 0 var(--modal-border-radius) var(--modal-border-radius);
  width: 40%;
  font-size: 24px;
  cursor: pointer;
}

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-container img {
  max-height: 100%;
  max-width: 60%;
  object-fit: contain;
}

.sizes {
  display: flex;
  justify-content: center;
  gap: var(--modal-padding);
  margin-top: var(--modal-padding);
}

.sizes button {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background-color: #eee;
  cursor: pointer;
  transition: 0.2s;
}

.sizes .selected {
  background-color: var(--hover-color);
}

.syrup-container {
  display: flex;
  justify-content: center;
}

.syrup-toggle {
  width: 100%;
  background-color: var(--secondary-color);
  color: var(--button-text-color);
  outline: 0.5px solid var(--primary-color);
  outline-offset: -1px;
  font-size: 15px;
  border-radius: 12px;
  cursor: pointer;
}

.pay-button {
  display: flex;
  z-index: 101;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-color);
  color: var(--button-text-color);
  font-size: 15px;
  padding: var(--modal-padding) 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.pay-button-total {
  font-size: x-large;
  font-weight: 600;
}
</style>
