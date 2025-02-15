<script setup>
</script>

<template>
  <div class="greetings">
    <h1 class="green">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" height="30" /> QR
      code
    </h1>
    <h3>
      Программа для генерации QR кода,чтения кода посредствам загрузки
      png-изображений или сканирование через камеру
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 400;
  font-size: 25px;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 18px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
