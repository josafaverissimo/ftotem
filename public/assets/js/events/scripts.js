import {EventPage} from "./main.js";
import {ManagerService} from "../services/manager.js";

const clientsPage = new EventPage()
const clientsManagerRequester = new ManagerService()

clientsManagerRequester.setPrefix('/events')

clientsPage.setRequester(clientsManagerRequester)
clientsPage.setMainTable('eventsTable', 'Cadastrar Evento', 'Editar Evento')
clientsPage.setBackgroundImageInput()
clientsPage.listenBackgroundFileInput()
clientsPage.setFormValidation()

clientsPage.getData()
