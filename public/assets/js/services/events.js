import {Requester} from "../utils/requester.js";

export class EventsService {
    constructor() {
        this.__requester = new Requester(`${baseUrl}/events`)
    }

    getAll() {
        return this.__requester.get('/getAll').then(response => response.data)
    }
}