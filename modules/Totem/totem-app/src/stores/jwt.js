import {defineStore} from "pinia";

export const useJwtStore = defineStore('jwt', {
    state: () => ({
        token: localStorage.getItem('token')
    }),
    actions: {
        setToken(token) {
            localStorage.setItem('token', token)
            this.token = token
        }
    }
})