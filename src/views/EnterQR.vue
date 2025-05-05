<!-- <template>
  <div>
    <h3>create - создать код</h3>
    <h3>read - прочитать QRкод из картинки</h3>
    <h3>readCamera - прочитать QRкод с помощью камеры</h3>
  </div>
</template> -->

<template>
  <fieldset class="container">
    <legend>Инструкция</legend>
    <div class="scanImage scanImage--center full">
      <span>С помощью данной програмы вы можете создать QR код и сохранить его в формате png. 
        Прочитать содержимое QR кода из картинки или путем сканирования камерой устройства.
      </span>
    </div>
  </fieldset>
</template>

<script setup>
import IconCamera from "@/components/icons/IconCamera.vue";
import IconQR from "@/components/icons/IconQR.vue";
</script>

<style>
</style>