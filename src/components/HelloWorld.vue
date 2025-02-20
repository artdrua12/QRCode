<script setup>
</script>

<template>
  <div class="greetings">
    <h1 class="green">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" height="30" /> QR
      code
    </h1>
    <h4>
      Программа для генерации QR кода,чтения кода посредствам загрузки
      png-изображений или сканирование через камеру
    </h4>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 400;
  font-size: 25px;
  margin-bottom: 20px;
}

h4 {
  text-align: justify;
  font-size: 16px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
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
