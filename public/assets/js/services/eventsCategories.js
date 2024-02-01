import {Requester} from "../utils/requester.js";

export class EventsCategoriesService {
    __requester

    constructor() {
        this.__requester = new Requester(`${baseUrl}/events/categories`)
    }

    getAll() {
        return this.__requester.get('/getAll').then(response => response.data)
    }
}