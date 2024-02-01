import {Requester} from "../utils/requester.js"

export class ViaCepService {
    __requester

    constructor() {
        this.__requester = new Requester('https://viacep.com.br/ws/')
    }

    getCepData(cep) {
        return this.__requester.get(`${cep}/json`)
            .then(response => {
                if(response.data.erro) {
                    return {
                        error: true
                    }
                }

                return {
                    state: response.data.uf,
                    city: response.data.localidade,
                    address: response.data.logradouro,
                    neighborhood: response.data.bairro
                }
            })
            .catch(() => {
                return {
                    error: true
                }
            })
    }
}
