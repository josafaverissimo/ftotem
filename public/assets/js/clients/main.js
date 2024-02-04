import {ManagerPage} from "../managerPage.js"
import {ViaCepService} from "../services/viacep.js"
import {getStates} from "../utils/getStates.js";

export class ClientPage extends ManagerPage {
    /** @type ViaCepService */
    __viaCepService

    constructor() {
        super()

        this.__viaCepService = new ViaCepService()
    }

    updateAddressFields(valuesByFields) {
        Object.keys(valuesByFields).forEach(field => {
            updateFieldValue(this.__formAction[field], valuesByFields[field])
        })
    }

    listenCepButtonClick() {
        const cepInput = this.__formAction.cep
        const cepSearchButton = cepInput.nextElementSibling

        cepSearchButton.addEventListener('click', async () => {
            cepSearchButton.classList.add('disabled')

            const data = await this.__viaCepService.getCepData(cepInput.value.replace('-', ''))

            cepSearchButton.classList.remove('disabled')

            if(data.error) {
                toastify('Não foi possível localizar o cep', 'warning')
                return
            }

            toastify('Dados do cep localizados!', 'success')
            this.updateAddressFields(data)
        })
    }
}
