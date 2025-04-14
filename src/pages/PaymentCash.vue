<template>
  <div class="payment-cash">
    <h1>Оплата наличными</h1>
    <p>Сумма для оплаты: {{ store.getFinalPrice }}₽</p>
    <p>Внесено: {{ enteredAmount }}₽</p>
    <button @click="startCashin">Начать приём наличных</button>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { emulator } from "@/emulator";
import { useDrinkStore } from "@/store";

const store = useDrinkStore();
const router = useRouter();

const enteredAmount = ref(0);
const paymentSuccessful = ref(false);
const paymentFailed = ref(false);

const startCashin = () => {
  emulator.StartCashin((amount) => {
    enteredAmount.value += amount;

    console.log(
      `Внесено: ${enteredAmount.value}, требуется: ${store.getFinalPrice}`
    );

    if (enteredAmount.value >= store.getFinalPrice) {
      paymentSuccessful.value = true;
      paymentFailed.value = false;
      emulator.StopCashin();
    } else {
      paymentFailed.value = false;
    }
  });
};

watch(paymentSuccessful, (val) => {
  if (val) {
    router.push("/timer");
  }
});

onBeforeUnmount(() => {
  emulator.StopCashin();
});
</script>

<style scoped>
.payment-cash {
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  height: 100%;
}

.payment-cash button {
  position: absolute;
  font-weight: 600;
  bottom: 0;
  right: 5%;
  left: 5%;
  padding: 20px;
  background-color: var(--modal-content-bg);
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
