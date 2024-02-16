import { http } from '@/utils/http.js'

export function uploadVideo(eventHash, videoBlob) {
    const data = new FormData()

    data.append('event_hash', eventHash)
    data.append('video', videoBlob, 'message.webm')

    return http.post('totem-api/clientsMessage/uploadVideo', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data)
}