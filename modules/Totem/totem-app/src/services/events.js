import {http} from '@/utils/http.js'

export function getEvents(page) {
    return http.get(`totem-app/events/get?page=${page}`)
        .then(response => response.data)
}