import request from '@/utils/request.js'

export const Login = (loginObj) => {
    return request.post('/users/login', loginObj)
}

export const Logout = (id) => {
    return request.post(`/users/logout/${id}`)
}