import {ManagerPage} from "../managerPage.js";
import {ManagerService} from "../services/manager.js";

const clientsPage = new ManagerPage()
const clientsCrudRequester = new ManagerService()

clientsCrudRequester.setPrefix('/clients')

clientsPage.setRequester(clientsCrudRequester)
clientsPage.setMainTable('clientsTable', 'Cadastrar Cliente', 'Editar Cliente')
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