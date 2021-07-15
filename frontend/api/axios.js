import axios from 'axios'
import { localStorageGet, localStorageRemove } from '../utils/localStorage'

const instance = axios.create({
    baseURL: 'http://192.168.100.11:5000/api/v1',
    headers: {
        'Content-Type': `application/json`
    }
})

instance.interceptors.request.use(
    config => {
        const token = localStorageGet('token')

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        } else {
            localStorageRemove('token')
        }

        return config
    },
    err => {
        return Promise.reject(err)
    }
)

export default instance
