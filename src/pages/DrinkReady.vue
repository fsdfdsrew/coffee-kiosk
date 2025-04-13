<template>
  <div @click="reset" class="drink-ready">
    <div class="drink-ready-message">
      <img src="/assets/cup-ready.svg" alt="Напиток готов" class="cup-icon" />
      <h2>Напиток готов!</h2>
      <p>вы можете забрать его</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useDrinkStore } from "@/store";

const store = useDrinkStore();
const router = useRouter();

const reset = () => {
  store.resetStore();
  router.push("/");
};
</script>

<style scoped>
.drink-ready {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  height: 100%;
}

.drink-ready-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.drink-ready-message img {
  width: 40%;
  margin-bottom: 10px;
}

.drink-ready-message h2 {
  font-weight: 600;
  font-size: 30px;
  text-align: center;
}
</style>
