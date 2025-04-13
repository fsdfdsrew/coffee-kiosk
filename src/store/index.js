import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { fetchDrinks } from "@/api/products";

export const useDrinkStore = defineStore("drink", () => {
  const state = reactive({
    drinks: [],
    selectedCategory: "coffee",
    selectedCategoryColor: "#EFCCB9",
    selectedDrink: null,
    selectedSize: 200,
    selectedSyrups: [],
    isLoading: false,
  });

  // Массив цветов категорий
  const categoryMap = {
    coffee: { label: "Кофе", color: "#EFCCB9" },
    tea: { label: "Чай", color: "#C9EA94" },
    milkshake: { label: "Молочный коктейль", color: "#F9ECD2" },
    soda: { label: "Морс и газ. напитки", color: "#FFE665" },
  };

  const getCategoryColor = (category) =>
    categoryMap[category]?.color || "#cccccc";

  const getCategoryLabel = (category) =>
    categoryMap[category]?.label || category;

  const fetchDrinksData = async () => {
    state.isLoading = true;
    try {
      const data = await fetchDrinks();
      state.drinks = data;
    } catch (error) {
      console.error("Ошибка при получении напитков", error);
    } finally {
      state.isLoading = false;
    }
  };

  const selectDrink = (drink) => {
    console.log(drink);
    state.selectedDrink = drink;
  };

  const selectSize = (size) => {
    state.selectedSize = size;
    console.log("Выбран размер: " + state.selectedSize);
  };

  const addSyrup = (syrup) => {
    state.selectedSyrups.push(syrup);
  };

  const removeSyrup = (syrup) => {
    const index = state.selectedSyrups.findIndex((s) => s.name === syrup.name);
    if (index !== -1) {
      state.selectedSyrups.splice(index, 1);
    }
  };

  const resetStore = () => {
    state.selectedDrink = null;
    state.selectedSize = 200;
    state.selectedSyrups = [];
    setCategory("coffee");
  };

  const getFinalPrice = computed(() => {
    const drink = state.selectedDrink;
    if (!drink) return 0;

    const selectedSize = state.selectedSize;

    const basePrice = drink.price; // цена за минимальный размер
    const sizes = drink.sizes.sort((a, b) => a - b); // сортируем на всякий случай
    const minSize = sizes[0];
    const multiplier = drink.multiplier;

    // Находим индекс текущего размера и минимального
    const selectedIndex = sizes.indexOf(selectedSize);
    const minIndex = sizes.indexOf(minSize);

    // Вычисляем разницу в шагах и применяем множитель соответствующее количество раз
    let sizePrice = basePrice;
    const steps = selectedIndex - minIndex;

    if (steps > 0) {
      for (let i = 0; i < steps; i++) {
        sizePrice *= multiplier;
      }
    }

    const syrupCost = state.selectedSyrups.length * 10; // Например, каждый сироп +10₽
    console.log(sizePrice + syrupCost);
    const totalprice = Math.round((sizePrice + syrupCost) * 100) / 100;
    return totalprice;
  });

  // Геттер для фильтрации напитков по категории
  const filteredDrinks = computed(() => {
    if (state.selectedCategory) {
      return state.drinks.filter(
        (drink) => drink.category === state.selectedCategory
      );
    }
    return state.drinks;
  });

  // Метод для изменения категории
  const setCategory = (category) => {
    state.selectedCategory = category;
    state.selectedCategoryColor = getCategoryColor(category);
  };

  return {
    state,
    fetchDrinksData,
    selectDrink,
    selectSize,
    addSyrup,
    removeSyrup,
    getFinalPrice,
    filteredDrinks,
    setCategory,
    getCategoryColor,
    getCategoryLabel,
    resetStore,
  };
});
