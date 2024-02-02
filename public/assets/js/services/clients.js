import {Requester} from "../utils/requester.js";

export class ClientsService {
    constructor() {
        this.__requester = new Requester(`${baseUrl}/clients`)
    }

    getAll() {
        return this.__requester.get('/getAll').then(response => response.data)
    }
}