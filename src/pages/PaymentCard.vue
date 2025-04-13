<template>
  <div class="payment-card" @keydown="handleKeydown" tabindex="0">
    <div class="payment-card-message">
      <img
        src="/assets/bank-card.svg"
        alt="Банковская карта"
        class="cup-icon"
      />
      <h2>Приложите карту<br />к терминалу</h2>
    </div>
    <button class="cancel-button" @click="$router.push('/payment-selection')">
      Отмена
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"; // Импортируем ref из Vue для реактивности
import { emulator } from "@/emulator"; // Импортируем эмулятор
import { useDrinkStore } from "@/store";
import { useRouter } from "vue-router";

const store = useDrinkStore();
const router = useRouter();

const paymentMessage = ref(""); // Сообщения с пин-пада
const paymentSuccessful = ref(false); // Флаг успешной оплаты

// Обработчик нажатия клавиш
const handleKeydown = (event) => {
  if (event.key === " ") {
    // Если нажата клавиша пробела, запускаем функцию оплаты
    startCardPayment();
  }
};

// Функция для начала оплаты картой
const startCardPayment = () => {
  paymentMessage.value = "Приложите карту...";
  // Эмуляция оплаты картой
  emulator.BankCardPurchase(
    store.getFinalPrice,
    (result) => {
      paymentSuccessful.value = result;
      paymentMessage.value = result
        ? "Оплата прошла успешно!"
        : "Ошибка при оплате. Попробуйте снова.";

      if (!result) {
        router.push("/payment-error");
      }
    },
    (message) => {
      paymentMessage.value = message; // Показать сообщения с пин-пада
    }
  );
};

watch(paymentMessage, (newValue, oldValue) => {
  console.log("Сообщение с терминала: " + paymentMessage.value);
});

watch(paymentSuccessful, (newValue, oldValue) => {
  console.log("Проверка оплаты: " + paymentSuccessful.value);
  if (paymentSuccessful.value === true) {
    router.push("/timer");
  }
});
</script>

<style scoped>
.payment-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-color);
  height: 100%;
}

.payment-card-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.payment-card-message img {
  width: 40%;
  margin-bottom: 10px;
}

.payment-card-message h2 {
  text-align: center;
}

.cancel-button {
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
