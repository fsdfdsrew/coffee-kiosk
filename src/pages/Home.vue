<template>
  <div
    style="
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: black;
    "
  >
    <n-carousel
      autoplay
      :interval="3000"
      show-arrow
      effect="slide"
      style="width: 100%; height: 100vh"
      @click="$router.push('/select')"
    >
      <img src="/ads/slide1.webp" alt="Реклама 1" class="carousel-img" />
      <img src="/ads/slide2.webp" alt="Реклама 2" class="carousel-img" />
      <img src="/ads/slide3.webp" alt="Реклама 3" class="carousel-img" />
    </n-carousel>
  </div>
</template>

<script setup>
import { NCarousel } from "naive-ui";
</script>

<style scoped>
.carousel-img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  cursor: pointer;
}
</style>
