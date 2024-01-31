import { Requester } from '../utils/requester.js'

export class ManagerService {
    __requester
    __prefix

    constructor() {
        this.__requester = new Requester()
    }

    setPrefix(prefix) {
        this.__prefix = prefix
    }

    save(data, callback = () => {}) {
        this.__requester.onResponse = callback

        return this.__requester.post(`${this.__prefix}/save`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        })
    }

    get(callback, searchOptions = {}) {
        this.__requester.onResponse = callback

        const params = new URLSearchParams()

        Object.keys(searchOptions).forEach(key => {
            params.append(key, searchOptions[key])
        })

        return this.__requester.get(`${this.__prefix}/get?${params.toString()}`)
    }

    delete(ids, callback = () => {}) {
        this.__requester.onResponse = callback

        return this.__requester.delete(this.__prefix, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ids})
        })
    }
}