import { http } from '@/utils/http.js'
import { useJwtStore } from "@/stores/jwt.js";
import { useEventsStore } from "@/stores/events.js";
import router from '@/router'

export function doLogin(username, password) {

    return http.post('totem-api/auth/doLogin', {username, password}).then(response => response.data)
}

export function validateToken() {
    const jwtStore = useJwtStore()

    return http.get('totem-api/auth/validateToken', {
        headers: {
            Authorization: `Bearer ${jwtStore.token}`
        }
    }).then(response => response.data.success)
}

export function logout() {
    const jwtStore = useJwtStore()
    const eventsStore = useEventsStore()

    jwtStore.setToken('')
    eventsStore.setCurrentEvent('')
    eventsStore.$reset()

    router.push('/login')
}
