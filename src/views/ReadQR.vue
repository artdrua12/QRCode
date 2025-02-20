<script setup>
import { useSnackStore } from "@/stores/snackStore";
import { useRequestStore } from "@/stores/requestStore";
import IconQR from "@/components/icons/IconQR.vue";
import { ref } from "vue";
const snack = useSnackStore();
const requests = useRequestStore();
const text = ref("");
const isGetText = ref(false);

function uploadFile(files) {
  if (!files) return;

  if (/\.(jpe?g|png)$/i.test(files[0].name)) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);

    let formData = new FormData();
    formData.append("file", files[0]);
    reader.onloadend = async () => {
      const response = await requests.post(
        "http://api.qrserver.com/v1/read-qr-code/",
        formData
      );
      const data = response.data;
      if(!data){
        snack.setSnack({
          text: "Ошибка при распознавании QR-кода",
          type: "error",
        });
        return;
      }

      isGetText.value = true;
      const img = document.getElementById("image");
      img.src = URL.createObjectURL(files[0]);
      text.value = data[0].symbol[0].data;
      snack.setSnack({
        text: "QR код успешно прочитан",
        type: "info",
      });
    };
  } else {
    snack.setSnack({
      text: "Вы можете загружать только изображения формата jpeg или png ",
      type: "error",
    });
  }
}
</script>

<template>
  <div class="container">
    <label class="scanImage">
      <IconQR v-show="!isGetText" />
      <span v-show="!isGetText">загрузить QR-код</span>
      <input
        type="file"
        name="qr"
        accept="image/*"
        @change="(e) => uploadFile(e?.target?.files)"
        hidden
      />
      <img v-show="isGetText" alt="qr" id="image" height="150px" />
    </label>
    <textarea v-show="isGetText" v-model="text" rows="2"></textarea>
    <button v-show="isGetText" @click="isGetText = !isGetText" class="button">
      Сбросить
    </button>
  </div>
</template>

<style scoped>

.container {
  width: auto;
  min-height: 300px;
  font-family: "Lobster", serif;
  display: grid;
  grid-gap: 30px;
  font-size: 18px;
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
</style>
