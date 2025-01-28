
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userStore = defineStore('userStore',()=> {
  const user = ref({
    id: '',
    token: '',
    employeeId: '',
    employeeName: '',
    password: '',
    role:'',
    age:'',
    sex:'',
    email:'',
    phone:'',
    address:'',
    idCard:'',
    birthday:'',
    creatorName: ''
})

  const setUser = (data) => {
    user.value = data
  } 

  const getUser = () => {
    return user.value
  }

  const removeUser = () => {
    user.value = {}
  }

  const getToken = () => {
    return user.value.token
  }

  const setToken = (token) => {
    user.value.token = token
  }

  const removeToken = () => {
    user.value.token = ''
  }

  const clearUser = () => {
    user.value = {}
  }

return {user, setUser,getUser, getToken, removeToken, clearUser}
}, {
  persist: {
    key: 'userInfo', // 存储的键名
    storage: localStorage // 存储的方式
  }
})
