import { defineStore } from 'pinia'
import { useSnackStore } from './snackStore'

export const useRequestStore = defineStore('request', () => {

  async function post(url, body) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: body
      })


      return await response.json()

    } catch (error) {
      const snack = useSnackStore()
      console.log('error', error);

      snack.setSnack({ text: 'Ошибка сети ', type: 'error' })
      return null
    }
  }

  return { post }
})