import {http} from '@/utils/http.js'

export function getEvents(page) {
    return http.get(`totem-api/events/getAll`)
        .then(response => response.data)
}