import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useSnackStore = defineStore('alert', () => {
  const snack = reactive([])
  const timer = ref(true);

  function setSnack(obj) {
    if (timer.value) {
      timer.value = false;
      const newObj = { ...obj, id: new Date().getMilliseconds() }
      snack.push(newObj)
      removeFirstElement()
      setTimeout(() => timer.value = true, 200);
    } else {
      setTimeout(() => {
        setSnack(obj)
      }, 500);
    }
  }


  function removeFirstElement() {
    setTimeout(() => {
      snack.shift()
      timer.value = true
    }, 3500)
  }


  return { snack, setSnack }
})