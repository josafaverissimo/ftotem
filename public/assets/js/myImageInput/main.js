export class ImageInput {
    __noImageIcon = `${baseUrl}/assets/imgs/no-image.jpeg`
    __allowedTypes
    __maxFileSizeMB


    static getInstance(containerId) {
        return ImageInput.instances[containerId]
    }

    setAllowedTypes(allowedTypes) {
        this.__allowedTypes = allowedTypes
    }

    setMaxFileSizeMB(maxFileSizeMB) {
        this.__maxFileSizeMB = maxFileSizeMB
    }

    loadFileInput(containerId) {
        this.__fileInputContainer = document.getElementById(containerId)
        this.__selectedImageContainer = this.__fileInputContainer.querySelector('.file-input__selected-image')
        this.__inputElement = this.__fileInputContainer.querySelector('input')

        if(!ImageInput.instances) {
            ImageInput.instances = {}
        }

        ImageInput.instances[containerId] = this
    }

    onChange(callback) {
        this.__selectedImageContainer.addEventListener('click', () => {
            this.__inputElement.click()
        })

        this.__inputElement.addEventListener('change', () => callback(this.__inputElement.files))
    }

    __changeFilenameAndSize(file) {
        const {name, size} = file
        const sizeMB = (size / 1024 / 1024).toFixed(2)

        this.__selectedImageContainer.querySelector('span.filename').textContent = name
        this.__selectedImageContainer.querySelector('span.filesize').textContent = `${sizeMB}MB`
    }

    __loadingImg() {
        this.__fileInputContainer.classList.add('loading')
    }

    __loadedImg() {
        this.__fileInputContainer.classList.remove('loading')
    }

    __checkFileSize(file) {
        const sizeMB = file.size / 1024 / 1024;

        return sizeMB <= this.__maxFileSizeMB
    }

    __checkFileType(file) {
        return this.__allowedTypes.includes(file.type)
    }

    changeImgSrc(src) {
        const img = this.__selectedImageContainer.querySelector('img')
        img.src = src
    }

    __changeImage(file) {
        this.__loadingImg()
        const fileReader = new FileReader()

        fileReader.onload = event => {
            const {result} = event.target

            this.changeImgSrc(result)

            this.__loadedImg()
        }

        fileReader.readAsDataURL(file)
    }

    changeFile(file) {
        if(!this.__checkFileSize(file)) {
            toastify(`O arquivo deve ser menor que ${this.__maxFileSizeMB}MB`, 'warning')
            this.clear()
            return
        }

        if(!this.__checkFileType(file)) {
            toastify('Selecione uma imagem', 'warning')
            return
        }

        this.__changeImage(file)
        this.__changeFilenameAndSize(file)
    }

    clear() {
        this.__inputElement.value = ''
        this.changeImgSrc(this.__noImageIcon)

        this.__selectedImageContainer.querySelector('span.filename').textContent = 'Nenhuma imagem selecionada'
        this.__selectedImageContainer.querySelector('span.filesize').textContent = ''
    }
}

ImageInput.instances = {}