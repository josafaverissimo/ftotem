import {IbgeService} from "../services/ibge.js";

export function getStates() {
    const offlineStates= [
        {
            "state": "RO",
            "name": "Rondônia"
        },
        {
            "state": "AC",
            "name": "Acre"
        },
        {
            "state": "AM",
            "name": "Amazonas"
        },
        {
            "state": "RR",
            "name": "Roraima"
        },
        {
            "state": "PA",
            "name": "Pará"
        },
        {
            "state": "AP",
            "name": "Amapá"
        },
        {
            "state": "TO",
            "name": "Tocantins"
        },
        {
            "state": "MA",
            "name": "Maranhão"
        },
        {
            "state": "PI",
            "name": "Piauí"
        },
        {
            "state": "CE",
            "name": "Ceará"
        },
        {
            "state": "RN",
            "name": "Rio Grande do Norte"
        },
        {
            "state": "PB",
            "name": "Paraíba"
        },
        {
            "state": "PE",
            "name": "Pernambuco"
        },
        {
            "state": "AL",
            "name": "Alagoas"
        },
        {
            "state": "SE",
            "name": "Sergipe"
        },
        {
            "state": "BA",
            "name": "Bahia"
        },
        {
            "state": "MG",
            "name": "Minas Gerais"
        },
        {
            "state": "ES",
            "name": "Espírito Santo"
        },
        {
            "state": "RJ",
            "name": "Rio de Janeiro"
        },
        {
            "state": "SP",
            "name": "São Paulo"
        },
        {
            "state": "PR",
            "name": "Paraná"
        },
        {
            "state": "SC",
            "name": "Santa Catarina"
        },
        {
            "state": "RS",
            "name": "Rio Grande do Sul"
        },
        {
            "state": "MS",
            "name": "Mato Grosso do Sul"
        },
        {
            "state": "MT",
            "name": "Mato Grosso"
        },
        {
            "state": "GO",
            "name": "Goiás"
        },
        {
            "state": "DF",
            "name": "Distrito Federal"
        }
    ]

    //const ibgeService = new IbgeService()

    // return ibgeService.getStates()
    //     .then(states => {
    //         if(!states) {
    //             return offlineStates
    //         }
    //
    //         return states.map(state => {
    //             return {
    //                 state: state.sigla,
    //                 name: state.nome
    //             }
    //         })
    //     })
    //     .catch(() => {
    //         return offlineStates
    //     })

    return offlineStates
}