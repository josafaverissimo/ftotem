import {UserPage} from "./main.js";
import {ManagerService} from "../services/manager.js";

const usersPage = new UserPage()
const usersCrudRequester = new ManagerService()

usersCrudRequester.setPrefix('/users')

usersPage.setRequester(usersCrudRequester)
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
