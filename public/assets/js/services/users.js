import { Requester } from '../utils/requester.js'

export class UsersService {
    __requester

    constructor() {
        this.__requester = new Requester()
    }

    save(userData, callback = () => {}) {
        this.__requester.onResponse = callback
        
        return this.__requester.post('/users/save', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: userData
        })
    }

    get(callback, searchOptions = {}) {
        this.__requester.onResponse = callback

        const params = new URLSearchParams()

        Object.keys(searchOptions).forEach(key => {
            params.append(key, searchOptions[key])
        })


        return this.__requester.get(`/users/get?${params.toString()}`)
    }

    delete(usersIds, callback = () => {}) {
        this.__requester.onResponse = callback

        return this.__requester.delete(`/users`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ids: usersIds})
        })
    }
}