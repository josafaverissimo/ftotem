export class MySelect {
    __container
    __mySelectList
    __input
    __options = []
    __onChange = () => {}

    static getInstance(containerId) {
        return MySelect.instances[containerId]
    }

    setOnChange(callback) {
        this.__onChange = callback
    }

    setOptions(options) {
        this.__options = options
    }

    loadSelect(selectId) {
        this.__container = document.getElementById(selectId)
        this.__mySelectList = this.__container.querySelector('.myselect__list')
        this.__input = this.__container.querySelector('input')
        this.__selectElement = this.__container.querySelector('select')
        this.__listenInputEvents()

        if(!MySelect.instances) {
            MySelect.instances = {}
        }

        MySelect.instances[this.__container.id] = this
    }

    __getFilteredOptions() {
        return this.__options.filter(option => {
            const inputValue = this.__input.value.toLocaleLowerCase().removeAccents()
            const optionTextContent = option.textContent.toLowerCase().removeAccents()

            return optionTextContent.indexOf(inputValue) !== -1
        })
    }

    __filterListByInputValue() {
        this.fill(this.__getFilteredOptions())
    }

    __getOptionByValue(value) {
        return this.__mySelectList.querySelector(`li[data-value="${value}"]`)
    }

    __resetInputValues() {
        this.fill(this.__options)
        updateFieldValue(this.__input, '')
        this.__selectElement.value = ''
    }

    __listenInputEvents() {
        this.__input.addEventListener('input', this.__filterListByInputValue.bind(this))
        this.__input.addEventListener('focus', () => {
            this.__mySelectList.classList.add('d-block')
        })
        this.__input.addEventListener('blur', () => {
            this.__mySelectList.classList.remove('d-block')

            const options = this.__getFilteredOptions()

            if(options.length !== 1) {
                this.__resetInputValues()
            } else if(options.length === 1) {
                const [option] = options
                this.changeTo(option.value)
            }
        })
    }

    __clearList() {
        this.__selectElement.value = ''
        this.__selectElement.innerHTML = ''
        this.__mySelectList.innerHTML = ''
    }

    __appendOptionInSelect(optionData) {
        const option = document.createElement('option')

        option.value = optionData.value
        this.__selectElement.appendChild(option)
    }

    changeTo(value) {
        const optionTextContent = this.__getOptionByValue(value).textContent
        this.__selectElement.value = value
        updateFieldValue(this.__input, optionTextContent)
        this.__onChange()
    }

    fill(options = this.__options) {
        this.__clearList()
        const ul = document.createElement('ul')

        options.forEach(option => {
            this.__appendOptionInSelect(option)

            const li = document.createElement('li')

            li.dataset.value = option.value
            li.textContent = option.textContent

            li.addEventListener('mousedown', () => {
                this.changeTo(option.value)
            })

            this.__selectElement.value = ''

            ul.appendChild(li)
        })

        this.__mySelectList.appendChild(ul)
    }
}

MySelect.instances = {}
