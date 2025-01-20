import request from '@/utils/request.js'

export const Login = (loginObj) => {
    return request.post('/users/login', loginObj)
}

