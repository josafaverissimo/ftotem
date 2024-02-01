export class Requester {
    __http
    onResponse = () => {}

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
        return this.__http(uri, {
            ...config,
            method: method
        }).then(response => {
            this.onResponse(response)

            return response
        })
    }
}