<template>
  <div class="timer-container">
    <div class="timer">
      <span>{{ formattedTime }}</span>
    </div>
    <p :style="{ color: '#A7A7A7' }">Приготовление напитка</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const minutes = ref(0);
const seconds = ref(20); // Начальное время — 20 секунд
const router = useRouter();

let timerId = null; // Идентификатор таймера для очистки

// Функция для обновления времени
const updateTimer = () => {
  if (seconds.value === 0 && minutes.value === 0) {
    // Таймер закончился, выводим сообщение
    router.push("/ready");
    clearInterval(timerId); // Останавливаем таймер
  } else {
    if (seconds.value === 0) {
      minutes.value -= 1;
      seconds.value = 59;
    } else {
      seconds.value -= 1;
    }
  }
};

// Форматируем время для отображения с ведущими нулями
const formattedTime = computed(() => {
  return `${String(minutes.value).padStart(2, "0")}:${String(
    seconds.value
  ).padStart(2, "0")}`;
});

onMounted(() => {
  // Запускаем таймер с интервалом 1 секунда
  timerId = setInterval(updateTimer, 1000);
});

onBeforeUnmount(() => {
  // Очищаем таймер при размонтировании компонента
  clearInterval(timerId);
});
</script>

<style scoped>
.timer-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.timer {
  font-size: 70px;
  color: var(--button-text-color);
}
</style>
