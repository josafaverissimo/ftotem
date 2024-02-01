import {ClientPage} from "./main.js";
import {ManagerService} from "../services/manager.js";

const clientsPage = new ClientPage()
const clientsManagerRequester = new ManagerService()

clientsManagerRequester.setPrefix('/clients')

clientsPage.setRequester(clientsManagerRequester)
clientsPage.setMainTable('clientsTable', 'Cadastrar Cliente', 'Editar Cliente')
clientsPage.listenCepButtonClick()
clientsPage.setMyStatesSelect()
clientsPage.fillStatesSelect()
clientsPage.setFormValidation([
    {
        name: 'name',
        nativeValidations: ['isRequired']
    },
    {
        name: 'cpf',
        nativeValidations: ['isRequired']
    },
    {
        name: 'cellphone',
        nativeValidations: ['isRequired']
    },
    {
        name: 'cep',
        nativeValidations: ['isRequired']
    },
    {
        name: 'state',
        nativeValidations: ['isRequired']
    },
    {
        name: 'city',
        nativeValidations: ['isRequired']
    },
    {
        name: 'neighborhood',
        nativeValidations: ['isRequired']
    },
    {
        name: 'house_number',
        nativeValidations: ['isRequired']
    }
])

clientsPage.getData()