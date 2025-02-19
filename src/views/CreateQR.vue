<script setup >
import { useSnackStore } from "@/stores/snackStore";
import { ref } from "vue";

const snack = useSnackStore();
const text = ref("");
const size = ref("100");
const color = ref("#000000");
const bgColor = ref("#ffffff");

function generateCode() {
  let el = document.querySelector("#img");
  el.innerHTML = "";
  new QRCode(el, {
    text: text.value,
    width: size.value,
    height: size.value,
    colorDark: color.value,
    colorLight: bgColor.value,
  });
}
</script>

<template>
  <div class="container">
    <!-- <legend>Создание кода</legend> -->

    <label class="form-control"> Текст </label>
    <input v-model="text" @keyup="generateCode()" />

    <label class="form-control"> Размер </label>
    <select v-model="size" @change="generateCode">
      <option v-for="i in 5" :value="100 * i" :key="i">
        {{ i * 100 }}
      </option>
    </select>

    <label class="form-control"> Цвет </label>
    <input type="color" v-model="color" @change="generateCode" />

    <label class="form-control"> Цвет фона </label>
    <input type="color" v-model="bgColor" @change="generateCode" />

    <div id="img" class="full"></div>

    <button class="button full">Загрузить</button>
  </div>
</template>


<style scoped>
.container {
  border: 3px dashed black;
  border-radius: 7px;
  font-family: "Lobster", serif;
  min-width: 200px;
  margin: auto;
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px 25px;
  padding: 20px;
}

#img {
  padding: 10px;
  display: flex;
  justify-content: center;
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    scale: 0;
  }
  100% {
    opacity: 1;
    scale: 1;
  }
}
</style>