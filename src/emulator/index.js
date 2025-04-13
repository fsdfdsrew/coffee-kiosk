export const emulator = {
  // Эмуляция работы с купюроприемником
  StartCashin(cb) {
    // Тут будет логика эмуляции приема купюр по нажатию клавиш
    console.log("Эмулятор: Купюроприемник включен.");

    // Пример обработки разных номиналов
    const denominations = [10, 50, 100, 500]; // Возможные номиналы монет/купюр
    document.addEventListener("keydown", (event) => {
      if (event.key === "1") cb(10); // Принять 10 рублей
      if (event.key === "2") cb(50); // Принять 50 рублей
      if (event.key === "3") cb(100); // Принять 100 рублей
      if (event.key === "4") cb(500); // Принять 500 рублей
    });
  },

  StopCashin() {
    console.log("Эмулятор: Купюроприемник отключен.");
    document.removeEventListener("keydown", () => {}); // Убираем слушатель
  },

  // Эмуляция оплаты картой
  BankCardPurchase(amount, cb, display_cb) {
    console.log(`Эмулятор: Попытка оплаты на сумму ${amount}₽`);

    display_cb("Приложите карту...");

    setTimeout(() => {
      display_cb("Обработка карты...");
    }, 1000);

    setTimeout(() => {
      display_cb("Связь с банком...");
    }, 2000);

    setTimeout(() => {
      const success = Math.random() > 0.5; // 80% шанс на успех
      display_cb(
        success ? "Оплата прошла успешно" : "Ошибка. Попробуйте снова"
      );
      cb(success); // Возвращаем результат (успех или неудача)
    }, 3000);
  },

  // Отмена операции по карте
  BankCardCancel() {
    console.log("Эмулятор: Операция по карте отменена.");
  },

  // Эмуляция выдачи напитка
  Vend(product_idx, cb) {
    console.log(`Эмулятор: Выдача напитка с индексом ${product_idx}`);

    cb(true);
  },
};
