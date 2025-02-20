<script setup>
import { useSnackStore } from "@/stores/snackStore";
import { useRequestStore } from "@/stores/requestStore";
import IconQR from "@/components/icons/IconQR.vue";
import { ref, useTemplateRef } from "vue";
const snack = useSnackStore();
const requests = useRequestStore();
const text = ref("");
const isGetText = ref(false);
const img = useTemplateRef("img");

async function uploadFile(files) {
  console.log("files", files);

  if (!files) {
    snack.setSnack({
      text: "Вы не выбрали файл",
      type: "error",
    });
    return;
  }

  if (/\.(jpe?g|png)$/i.test(files[0].name)) {
    let formData = new FormData();
    formData.append("file", files[0]);

    const response = await requests.post(
      "https://api.qrserver.com/v1/read-qr-code/",
      formData
    );
    text.value = response[0]?.symbol[0]?.data;

    if (!text.value) {
      snack.setSnack({
        text: "Ошибка при распознавании QR-кода",
        type: "error",
      });
      return;
    }

    isGetText.value = true;
    img.value.src = URL.createObjectURL(files[0]);

    snack.setSnack({
      text: "QR код успешно прочитан",
      type: "info",
    });
  } else {
    snack.setSnack({
      text: "Вы можете загружать только изображения формата jpeg или png ",
      type: "error",
    });
  }
}
</script>

<template>
  <fieldset class="container">
    <legend>Прочитать QR-код из картинки</legend>
    <label class="scanImage full" v-if="!isGetText">
      <IconQR />
      <span>загрузить QR-код</span>
      <input
        type="file"
        name="qr"
        accept="image/*"
        @input="(e) => uploadFile(e?.target?.files)"
        hidden
      />
    </label>
    <img v-show="isGetText" alt="qr" ref="img" height="150px" class="full" />
    <textarea
      v-show="isGetText"
      v-model="text"
      rows="2"
      class="full"
    ></textarea>
    <button
      v-show="isGetText"
      @click="isGetText = !isGetText"
      class="button full"
    >
      Сбросить
    </button>
  </fieldset>
</template>

<style scoped>
.scanImage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

img {
  margin: auto;
}
</style>
