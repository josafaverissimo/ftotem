import {EventPage} from "./main.js";
import {ManagerService} from "../services/manager.js";

const eventPage = new EventPage()
const eventsManagerRequester = new ManagerService()

eventsManagerRequester.setPrefix('/events')

eventPage.setRequester(eventsManagerRequester)
eventPage.setMainTable('eventsTable', 'Cadastrar Evento', 'Editar Evento')
eventPage.setTableInputNamesByColumnName()
eventPage.setTableCellsRenders()
eventPage.setEventsCategories()
eventPage.fillEventsCategories()
eventPage.setClients()
eventPage.fillClients()
eventPage.setBackgroundImageInput()
eventPage.listenBackgroundFileInput()
eventPage.setFormValidation([
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
    },
    {
        name: 'clients_ids[]',
        nativeValidations: ['isRequired']
    }
])

eventPage.getData()
