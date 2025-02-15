import { defineStore } from 'pinia'
import { useSnackStore } from './snackStore'
const BASE_URL = import.meta.env.VITE_API_ENDPOINT

export const useRequestStore = defineStore('request', () => {
  async function get(url) {
    try {
      const response = await fetch(BASE_URL + url, {
        credentials: 'include' // credentials - возвращает куки на сервер, без этого придет пустой запрос
        // headers: {
        //   Accept: 'application/json',
        //   'Content-Type': 'application/json'
        // }
      })
      if (response.ok) {
        // response.ok- заголовок лежит от 200 до 299
        return await response.json()
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      console.log('error', error)
      const snack = useSnackStore()
      snack.setSnack({ text: 'Ошибка сети ', type: 'error' })
      return null
    }
  }

  async function post(url, body) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: body
        // headers: {
        //   'Content-Type': 'application/json',
        //   'Cache-Control': 'no-cache',
        // },
        // body: JSON.stringify(body)
      })


      return await response.json()

    } catch (error) {
      const snack = useSnackStore()
      console.log('error', error);

      snack.setSnack({ text: 'Ошибка сети ', type: 'error' })
      return null
    }
  }

  async function postText(url, body) {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'API-Key': 'secret'
        },
        credentials: 'include',
        body: JSON.stringify(body)
      })

      if (response.ok) {
        return await response.text()
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      const snack = useSnackStore()
      snack.setSnack({ text: 'Ошибка сети ', type: 'error' })
      return null
    }
  }

  async function put(url, body) {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'API-Key': 'secret'
        },
        credentials: 'include',
        body: JSON.stringify(body)
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      const snack = useSnackStore()
      snack.setSnack({ text: 'Ошибка сети ', type: 'error' })
      return null
    }
  }

  async function delet(url) {
    try {
      const response = await fetch(BASE_URL + url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'API-Key': 'secret'
        },
        credentials: 'include',
      })
      if (response.ok) {
        return true
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      console.log('error', error)
      const snack = useSnackStore()
      snack.setSnack({ text: 'Ошибка сети ', type: 'error' })
      return null
    }
  }

  return { get, post, postText, put, delet }
})