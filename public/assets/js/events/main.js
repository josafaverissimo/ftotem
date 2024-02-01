import {ManagerPage} from "../managerPage.js";

export class EventPage extends ManagerPage
{
    __backgroundImageInput
    __selectedImageContainer
    __allowedImgTypes = ['image/jpeg', 'image/png']

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
        const backgroundImageInput = this.__formAction['background_image']

        this.__selectedImageContainer.addEventListener('click', () => {
            backgroundImageInput.click()
        })

        backgroundImageInput.addEventListener('input', () => {
            const [file] = backgroundImageInput.files

            if(!file) {
                toastify('Seleciona algum arquivo', 'warning')
                return
            }

            console.log(file)

            this.__changeFile(file)
        })
    }
}
