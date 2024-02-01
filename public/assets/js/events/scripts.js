import {EventPage} from "./main.js";
import {ManagerService} from "../services/manager.js";

const clientsPage = new EventPage()
const clientsManagerRequester = new ManagerService()

clientsManagerRequester.setPrefix('/events')

clientsPage.setRequester(clientsManagerRequester)
clientsPage.setMainTable('eventsTable', 'Cadastrar Evento', 'Editar Evento')
clientsPage.setEventsCategories()
clientsPage.fillEventsCategories()
clientsPage.setBackgroundImageInput()
clientsPage.listenBackgroundFileInput()
clientsPage.setFormValidation([
    {
        name: 'name',
        nativeValidations: ['isRequired']
    },
    {
        name: 'event_category_id',
        nativeValidations: ['isRequired']
    },
    {
        name: 'background',
        nativeValidations: ['isRequired']
    }
])

clientsPage.getData()
