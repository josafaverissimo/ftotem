import {EventCategoryPage} from "./main.js";
import {ManagerService} from "../services/manager.js";

const eventsCategoriesPage = new EventCategoryPage()
const eventsCategoriesManagerRequester = new ManagerService()

eventsCategoriesManagerRequester.setPrefix('/events/categories')

eventsCategoriesPage.setRequester(eventsCategoriesManagerRequester)
eventsCategoriesPage.setMainTable('eventsCategoriesTable', 'Cadastrar Categoria do Evento', 'Editar Categoria do Evento')
eventsCategoriesPage.setFormValidation([
    {
        name: 'name',
        nativeValidations: ['isRequired']
    }
])

eventsCategoriesPage.getData()
