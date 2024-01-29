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

        if(searchOptions.term) {
            params.append('term', searchOptions.term)
        }

        if(searchOptions.page) {
            params.append('page', searchOptions.page)
        }


        return this.__requester.get(`/users/get?${params.toString()}`)
    }
}