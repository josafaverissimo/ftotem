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
    },
    getters: {
        data() {
            if(!this.token) {
                return null
            }

            return JSON.parse(atob(this.token.split('.')[1]))
        }
    }
})