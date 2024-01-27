export class Requester {
    __http
    __observers = []
    __response
    onResponse

    constructor(baseURL = baseUrl) {
        this.__http = axios.create({
            baseURL: baseURL
        })
    }

    get(uri, config = {}) {
        return this.__request('get', uri, config)
    }

    post(uri, config = {}) {
        return this.__request('post', uri, config)
    }

    put(uri, config = {}) {
        return this.__request('put', uri, config)
    }

    delete(uri, config = {}) {
        return this.__request('delete', uri, config)
    }

    __request(method, uri = '/', config = {}) {
        this.__http(uri, {
            ...config,
            method: method
        }).then(response => {
            this.onResponse(response)
        })
    }
}