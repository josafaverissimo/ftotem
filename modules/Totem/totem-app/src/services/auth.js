import {http} from '@/utils/http.js'
import { useJwtStore } from "@/stores/jwt.js";

export function doLogin(username, password) {

    return http.post('totem-app/auth/doLogin', {username, password}).then(response => response.data)
}

export function validateToken() {
    const jwtStore = useJwtStore()

    return http.get('totem-app/auth/validateToken', {
        headers: {
            Authorization: `Bearer ${jwtStore.token}`
        }
    }).then(response => response.data.success)
}