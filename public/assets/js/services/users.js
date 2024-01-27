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
}