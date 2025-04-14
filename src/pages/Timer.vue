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
const seconds = ref(20);
const router = useRouter();

let timerId = null;

const updateTimer = () => {
  if (seconds.value === 0 && minutes.value === 0) {
    router.push("/ready");
    clearInterval(timerId);
  } else {
    if (seconds.value === 0) {
      minutes.value -= 1;
      seconds.value = 59;
    } else {
      seconds.value -= 1;
    }
  }
};

const formattedTime = computed(() => {
  return `${String(minutes.value).padStart(2, "0")}:${String(
    seconds.value
  ).padStart(2, "0")}`;
});

onMounted(() => {
  timerId = setInterval(updateTimer, 1000);
});

onBeforeUnmount(() => {
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
