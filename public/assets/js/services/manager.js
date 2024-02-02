import { Requester } from '../utils/requester.js'

export class ManagerService {
    __requester
    __prefix
    __config = {}

    constructor() {
        this.__requester = new Requester()
    }

    setConfig(config) {
        this.__config = config
    }

    setPrefix(prefix) {
        this.__prefix = prefix
    }

    save(data, callback = () => {}) {
        this.__requester.onResponse = callback

        let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        for(const value of data.values()) {
            if(value instanceof File) {
                headers['Content-Type'] = 'multipart/form-data'
                break
            }
        }

        return this.__requester.post(`${this.__prefix}/save`, {
            headers,
            data: data,
            ...this.__config
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