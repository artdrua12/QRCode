<script setup >
import { useSnackStore } from "@/stores/snackStore";
import { ref, useTemplateRef } from "vue";

const snack = useSnackStore();
const text = ref("");
const size = ref("100");
const color = ref("#000000");
const bgColor = ref("#ffffff");
const code = useTemplateRef("code");

function generateCode() {
  if (!text.value) {
    return;
  }
  code.value.innerHTML = "";
  new QRCode(code.value, {
    text: text.value,
    width: size.value,
    height: size.value,
    colorDark: color.value,
    colorLight: bgColor.value,
  });
}

function downLoadQR() {
  if (!text.value) {
    snack.setSnack({
      text: "Необходимо ввести текст для создания QR кода",
      type: "error",
    });
    return;
  }
  const src = code.value.childNodes[1].src;
  if (!src) {
    snack.setSnack({
      text: "Ошибка при прочтении src QR кода",
      type: "error",
    });
    return;
  }
  let a = document.createElement("a");
  a.href = src;
  a.download = "QRcode.png";
  a.click();
}
</script>

<template>
  <fieldset class="container">
    <legend>Создание кода</legend>

    <label class="form-control"> Текст </label>
    <input v-model="text" @keyup="generateCode()" />

    <label class="form-control"> Размер </label>
    <select v-model="size" @change="generateCode">
      <option v-for="i in 3" :value="100 * i" :key="i">
        {{ i * 100 }}
      </option>
    </select>

    <label class="form-control"> Цвет </label>
    <input type="color" v-model="color" @change="generateCode" />

    <label class="form-control"> Цвет фона </label>
    <input type="color" v-model="bgColor" @change="generateCode" />

    <div v-if="text" ref="code" class="code full"></div>

    <button class="button full" @click="downLoadQR">Сохранить QR</button>
  </fieldset>
</template>


<style scoped>
input {
  width: 100%;
  height: 100%;
}
.code {
  border: 2px dashed black;
  border-radius: 3px;
  padding: 10px;
  display: flex;
  justify-content: center;
  animation: fadeIn 1s;
}

</style>