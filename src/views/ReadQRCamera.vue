<script setup>
import { useSnackStore } from "@/stores/snackStore";
import { ref } from "vue";
import IconCamera from "@/components/icons/IconCamera.vue";
const snack = useSnackStore();

const scanner = ref();
const text = ref("");
const isGetText = ref(false);
const isScan = ref(true);

function scanQRImage() {
  isGetText.value = true;
  scanner.value = new Instascan.Scanner({
    video: document.getElementById("video"),
    captureImage: true,
  });

  if (scanner.value) {
    Instascan.Camera.getCameras()
      .then((camera) => {
        if (camera.length > 0) {
          scanner.value.start(camera[0]);
        }
      })
      .catch(() => {
        snack.setSnack({
          text: "Ошибка доступа к камере",
          type: "error",
        });
      });

    scanner.value.addListener("scan", (textQR, image) => {
      if (scanner.value) {
        stopScan();
        const my = document.getElementById("image");
        my.src = image;
        text.value = textQR;
        snack.setSnack({
          text: "QR код успешно прочитан",
          type: "info",
        });
      } else {
        snack.setSnack({
          text: "Ошибка при сканировании QR-кода",
          type: "error",
        });
      }
    });
  }
}

function stopScan() {
  scanner.value.stop();
  isScan.value = false;
}
</script>

<template>
  <div class="container">
    <div class="scanImage" @click="scanQRImage">
      <IconCamera v-show="!isGetText" />
      <span v-show="!isGetText">сканировать QR-код с помощью камеры</span>
      <div v-show="isGetText">
        <video v-show="isScan" id="video"></video>
        <img v-show="!isScan" alt="qr" id="image" height="300px" />
      </div>
    </div>
    <textarea v-show="isGetText" v-model="text" rows="2"></textarea>
    <button
      v-show="isGetText"
      @click="
        isGetText = !isGetText;
        isScan = true;
        text.value = '';
      "
      class="button"
    >
      Сбросить
    </button>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");
.container {
  width: auto;
  min-height: 300px;
  font-family: "Lobster", serif;
  display: grid;
  grid-gap: 30px;
}

.scanImage {
  border: 3px dashed black;
  border-radius: 7px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
}
video {
  width: 100%;
  height: 300px;
}
img {
  object-fit: cover;
}
</style>
