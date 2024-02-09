import {http} from '@/utils/http.js'

export function getEvents() {
    return http.get(`totem-app/events/getAll`).then(response => console.log(response))
}