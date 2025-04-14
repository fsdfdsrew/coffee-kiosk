<template>
  <div class="payment-error" tabindex="0">
    <div class="payment-error-message">
      <img src="/assets/error.svg" alt="Банковская карта" class="cup-icon" />
      <h2>Оплата не прошла</h2>
    </div>
    <div class="buttons-container">
      <button class="again-button" @click="$router.push('/payment-selection')">
        Попробовать ещё раз
      </button>
      <button class="cancel-button" @click="$router.push('/select')">
        Отмена
      </button>
    </div>
  </div>
</template>

<style scoped>
.payment-error {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f03b3b;
  height: 100%;
  color: var(--modal-content-bg);
}

.payment-error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.payment-error-message img {
  width: 30%;
  margin-bottom: 10px;
}

.payment-error-message h2 {
  text-align: center;
}

.buttons-container {
  display: flex;
  gap: 10px;
  flex-direction: column;
  position: absolute;
  right: 5%;
  left: 5%;
  bottom: 0;
  margin-bottom: 20px;
}

.buttons-container button {
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
}

.again-button {
  background-color: var(--modal-content-bg);
  color: #f03b3b;
  font-weight: 500;
}

.cancel-button {
  color: var(--modal-content-bg);
  background-color: transparent;
  outline: 0.5px solid var(--modal-content-bg);
  outline-offset: -1px;
}
</style>
