<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="button-container" @click="$emit('close')">
        <button @click="close">×</button>
      </div>

      <div class="syrup-container">
        <div v-for="syrup in syrupList" :key="syrup.name" class="syrup-row">
          <span>{{ syrup.name }}</span>
          <div class="syrup-controls">
            <button @click="updateSyrup(syrup, -5)">−</button>
            <span>{{ syrup.amount }} гр.</span>
            <button class="plus-syrup-button" @click="updateSyrup(syrup, 5)">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useDrinkStore } from "@/store";

const store = useDrinkStore();

// Пример списка сиропов
const syrupList = reactive([
  { name: "Ванильный сироп", amount: 0 },
  { name: "Мятный сироп", amount: 0 },
  { name: "Карамельный сироп", amount: 0 },
  { name: "Шоколадный сироп", amount: 0 },
]);

function updateSyrup(syrup, delta) {
  syrup.amount += delta;
  if (syrup.amount < 0) syrup.amount = 0;
  if (delta > 0) store.addSyrup(syrup);
  else store.removeSyrup(syrup);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.modal-content {
  display: grid;
  grid-template-rows: 1fr auto 1.5fr;
  background: var(--modal-content-bg);
  border-radius: var(--modal-border-radius) var(--modal-border-radius) 0 0;
  width: 100%;
  padding: 0 var(--modal-padding) 20px var(--modal-padding);
  max-height: 70vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease-out;
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

.syrup-container {
  overflow-y: auto;
}

.syrup-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--modal-padding);
  border-radius: 10px;
  outline: 0.5px solid #d8d8d8;
  outline-offset: -1px;
  margin: 5px 0;
}

.plus-syrup-button {
  background-color: var(--primary-color) !important;
}

.syrup-controls button {
  background-color: #eee;
  border: none;
  padding: 5px var(--modal-padding);
  margin: 0 5px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
</style>
