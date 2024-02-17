import { Requester } from "../utils/requester.js";

export class EventsVideosService {
    constructor() {
        this.__requester = new Requester(`${baseUrl}/events/videos`)
    }

    getDataByEventId(eventId) {
        return this.__requester.get(`/getVideosDataByEventId/${eventId}`).then(response => response.data)
    }

    delete(videoId) {
        return this.__requester.delete(`/delete/${videoId}`).then(response => response.data)
    }
}