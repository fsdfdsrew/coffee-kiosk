<template>
  <div class="payment-selection">
    <h1>Выберите<br />способ оплаты</h1>
    <button type="success" @click="goToCashPayment">Оплата наличными</button>
    <button type="warning" @click="goToCardPayment">Оплата картой</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    // Переход на экран с оплатой наличными
    const goToCashPayment = () => {
      router.push("/payment-cash");
    };

    // Переход на экран с оплатой картой
    const goToCardPayment = () => {
      router.push("/payment-card");
    };

    return {
      goToCashPayment,
      goToCardPayment,
    };
  },
};
</script>

<style scoped>
.payment-selection {
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  height: 100%;
}

.payment-selection button {
  padding: var(--modal-padding);
  width: 70%;
  text-align: center;
  background-color: var(--modal-content-bg);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
}
</style>
