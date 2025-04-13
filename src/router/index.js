import { createRouter, createWebHistory } from "vue-router";

import Carousel from "@/pages/Home.vue";
import DrinkSelection from "@/pages/DrinkSelection.vue";
import PaymentSelection from "@/pages/PaymentSelection.vue";
import DrinkReady from "@/pages/DrinkReady.vue";
import PaymentCard from "@/pages/PaymentCard.vue";
import PaymentCash from "@/pages/PaymentCash.vue";
import PaymentError from "@/pages/PaymentError.vue";
import Timer from "@/pages/Timer.vue";

const routes = [
  { path: "/", component: Carousel },
  { path: "/select", component: DrinkSelection },
  { path: "/payment-selection", component: PaymentSelection },

  { path: "/ready", component: DrinkReady },

  { path: "/payment-card", component: PaymentCard },
  { path: "/payment-cash", component: PaymentCash },
  { path: "/payment-error", component: PaymentError },
  { path: "/timer", component: Timer },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
