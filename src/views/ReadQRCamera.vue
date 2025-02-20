<script setup>
import { useSnackStore } from "@/stores/snackStore";
import { ref, useTemplateRef } from "vue";
import IconCamera from "@/components/icons/IconCamera.vue";
const snack = useSnackStore();

const scanner = ref();
const text = ref("");
const isGetText = ref(false);
const isScan = ref(true);
const imgv = useTemplateRef("imgv");

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
        imgv.value.src = image;
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

function newScan() {
  scanner.value.stop();
  isGetText.value = !isGetText.value;
  isScan.value = true;
  text.value = "";
}
</script>

<template>
  <fieldset class="container">
    <legend>Сканирование QR кода камерой</legend>
    <div class="scanImage scanImage--center full" @click="scanQRImage" v-show="!isGetText">
      <IconCamera />
      <span>сканировать QR-код камерой</span>
    </div>
    <div v-show="isGetText" class="scanImage full">
      <video v-show="isScan" id="video"></video>
      <img ref="imgv" v-show="!isScan" alt="qr" id="image" height="300px" />

      <textarea v-model="text" rows="2"></textarea>
      <button @click="newScan" class="button">Сбросить</button>
    </div>
  </fieldset>
</template>

<style scoped>
.scanImage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  cursor: pointer;
  gap: 20px;
}

.scanImage--center {
  justify-content: center;
  align-items:center;
  gap: 0px;
}

video {
  width: 100%;
  height: 300px;
  margin: auto;
}
img {
  object-fit: cover;
}
</style>
