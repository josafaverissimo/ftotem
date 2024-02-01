import {UserPage} from "./main.js";
import {ManagerService} from "../services/manager.js";

const usersPage = new UserPage()
const usersManagerRequester = new ManagerService()

usersManagerRequester.setPrefix('/users')

usersPage.setRequester(usersManagerRequester)
usersPage.setMainTable('usersTable', 'Cadastrar Usuário', 'Editar Usuário')
usersPage.togglePasswordInput()
usersPage.setFormValidation([
    {
        name: 'name',
        nativeValidations: ['isRequired']
    },
    {
        name: 'username',
        nativeValidations: ['isRequired']
    },
    {
        name: 'password',
        nativeValidations: ['isRequired']
    },
    {
        name: 'cpf',
        nativeValidations: ['isRequired']
    },
    {
        name: 'cellphone',
        nativeValidations: ['isRequired']
    }
])

usersPage.getData()
