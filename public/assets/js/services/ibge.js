import {Requester} from "../utils/requester.js"

export class IbgeService {
    __requester

    constructor() {
        this.__requester = new Requester('https://servicodados.ibge.gov.br/api/v1/')
    }

    getStates(uf = '') {
        return this.__requester.get(`localidades/estados/${uf}`)
            .then(response => {
                return response.data
            })
    }
}