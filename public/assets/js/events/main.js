import {ManagerPage} from "../managerPage.js";
import {MyMultipleSelect, MySelect} from "../mySelect/main.js";
import {EventsCategoriesService} from "../services/eventsCategories.js";
import {ImageInput} from "../myImageInput/main.js";
import {ClientsService} from "../services/clients.js";

export class EventPage extends ManagerPage
{
    __backgroundImageInput
    /** @type MySelect */
    __eventsCategoriesSelect
    __eventsCategoriesService
    __allowedImgTypes = ['image/jpeg', 'image/png']
    __maxFileSizeMB = 5

    constructor() {
        super();

        this.__eventsCategoriesService = new EventsCategoriesService()
        this.__clientsService = new ClientsService()
    }

    setTableInputNamesByColumnName() {
        this.__mainTable.inputNameByColumnName = {
            category: 'event_category_id'
        }
    }

    setBackgroundImageInput() {
        this.__backgroundImageInput = new ImageInput()
        this.__backgroundImageInput.loadFileInput('file-input__background')
        this.__backgroundImageInput.setAllowedTypes(this.__allowedImgTypes)
        this.__backgroundImageInput.setMaxFileSizeMB(this.__maxFileSizeMB)
    }

    listenBackgroundFileInput() {
        this.__backgroundImageInput.onChange(([file]) => {
            if(!file) {
                toastify('Seleciona algum arquivo', 'warning')
                return
            }

            this.__backgroundImageInput.changeFile(file)
        })
    }

    setEventsCategories() {
        this.__eventsCategoriesSelect = new MySelect()
        this.__eventsCategoriesSelect.loadSelect('mytable__form-myselect-event-category-id')
    }

    async fillEventsCategories() {
        const eventsCategories = await this.__eventsCategoriesService.getAll()

        const options = eventsCategories.map(eventCategory => ({
            value: eventCategory.id,
            textContent: eventCategory.name
        }))
        this.__eventsCategoriesSelect.setOptions(options)
        this.__eventsCategoriesSelect.fill()
    }

    setClients() {
        this.__clientsMultipleSelect = new MyMultipleSelect()
        this.__clientsMultipleSelect.loadSelect('mytable__form-myselect-event-clients-ids')
    }

    async fillClients() {
        const clients = await this.__clientsService.getAll()
        const options = clients.map(client => ({
            value: client.id,
            textContent: client.name
        }))

        this.__clientsMultipleSelect.setOptions(options)
        this.__clientsMultipleSelect.fill()
    }
}
