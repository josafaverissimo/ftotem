import {http} from '@/utils/http.js'

export function getEvents(page) {
    return http.get(`totem-api/events/getAll`)
        .then(response => response.data)
}

export function getByHash(hash) {
    return http.get(`totem-api/events/getByHash/${hash}`).then(response => response.data)
}
