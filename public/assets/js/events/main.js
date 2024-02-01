import {ManagerPage} from "../managerPage.js";
import {MySelect} from "../mySelect/main.js";
import {EventsCategoriesService} from "../services/eventsCategories.js";

export class EventPage extends ManagerPage
{
    __backgroundImageInput
    __selectedImageContainer
    __allowedImgTypes = ['image/jpeg', 'image/png']
    /** @type MySelect */
    __eventsCategoriesSelect
    __eventsCategoriesService

    constructor() {
        super();

        this.__eventsCategoriesService = new EventsCategoriesService()
    }

    setBackgroundImageInput() {
        this.__backgroundImageInput = document.getElementById('file-input__background-image')
        this.__selectedImageContainer = this.__backgroundImageInput.querySelector('.file-input__selected-image')
    }

    __changeFilenameAndSize(file) {
        const {name, size} = file
        const sizeMB = (size / 1024 / 1024).toFixed(2)

        this.__selectedImageContainer.querySelector('span.filename').textContent = name
        this.__selectedImageContainer.querySelector('span.filesize').textContent = `${sizeMB}MB`
    }

    __loadingImg() {
        this.__backgroundImageInput.classList.add('loading')
    }

    __loadedImg() {
        this.__backgroundImageInput.classList.remove('loading')
    }

    __checkFileType(file) {
        return this.__allowedImgTypes.includes(file.type)
    }

    __changeImage(file) {
        if(!this.__checkFileType(file)) {
            toastify('Selecione uma imagem')
        }

        this.__loadingImg()

        const imgElement = this.__selectedImageContainer.querySelector('img')
        const fileReader = new FileReader()

        fileReader.readAsDataURL(file)

        fileReader.onload = event => {
            const {result} = event.target
            imgElement.src = result

            this.__loadedImg()
        }
    }

    __changeFile(file) {
        this.__changeImage(file)
        this.__changeFilenameAndSize(file)
    }

    listenBackgroundFileInput() {
        const backgroundImageInput = this.__formAction['background']

        this.__selectedImageContainer.addEventListener('click', () => {
            backgroundImageInput.click()
        })

        backgroundImageInput.addEventListener('input', () => {
            const [file] = backgroundImageInput.files

            if(!file) {
                toastify('Seleciona algum arquivo', 'warning')
                return
            }

            this.__changeFile(file)
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
}
