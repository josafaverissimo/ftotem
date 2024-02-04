export class MySelect {
    __container
    __mySelectList
    __options = []
    __selectedOptions = {}
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
        this.__inputReadonly = this.__container.querySelector('input[readonly]')
        this.__inputSearch = this.__container.querySelector('input[type="search"]')
        this.__selectElement = this.__container.querySelector('select')
        this.__listenInputEvents()
        this.__listenOrderButton()

        if(!MySelect.instances) {
            MySelect.instances = {}
        }

        MySelect.instances[this.__container.id] = this
    }

    __listenOrderButton() {
        this.__mySelectList.querySelector('.order').addEventListener('click', () => {
            this.fill()
        })
    }

    __getFilteredOptions() {
        return this.__options.filter(option => {
            const inputValue = this.__inputSearch.value.toLocaleLowerCase().removeAccents()
            const optionTextContent = option.textContent.toLowerCase().removeAccents()

            return optionTextContent.indexOf(inputValue) !== -1
        })
    }

    __filterListByInputValue() {
        this.fill(this.__getFilteredOptions())
    }

    __getLiOptionByValue(value) {
        return this.__mySelectList.querySelector(`li[data-value="${value}"]`)
    }

    __resetInputValues() {
        this.fill(this.__options)
        updateFieldValue(this.__inputReadonly, '')
        updateFieldValue(this.__inputSearch, '')
        this.__selectElement.value = ''
    }

    __optionByTextContent(textContent) {
        return [].find.call(this.__mySelectList.querySelectorAll('li'), li => li.textContent === textContent)
    }

    __listenInputEvents() {
        this.__inputSearch.addEventListener('input', this.__filterListByInputValue.bind(this))
        this.__inputReadonly.addEventListener('focus', () => {
            this.__mySelectList.classList.add('d-block')
            this.__inputSearch.focus()
        })
        window.addEventListener('click', ({target}) => {
            if(target.closest(`#${this.__container.id}`)) {
                return
            }

            this.__mySelectList.classList.remove('d-block')
        })
    }

    unselectItems() {
        this.__selectElement.querySelectorAll('option[selected]').forEach(option => {
            option.selected = false
            option.removeAttribute('selected')
            this.__selectElement.value = ''
        })

        this.__mySelectList.querySelectorAll('li.selected').forEach(li => li.classList.remove('selected'))

        this.__selectedOptions = {}
    }

    __doEmptySelectAndList() {
        this.__selectElement.innerHTML = ''
        this.__mySelectList.querySelector('ul').innerHTML = ''
    }

    __appendOptionInSelect(optionData) {
        const option = document.createElement('option')

        option.value = optionData.value
        this.__selectElement.appendChild(option)
    }

    __selectLiOption(li) {
        this.unselectItems()

        if(!li.classList.contains('selected')) {
            const option = this.__selectElement.querySelector(`option[value="${li.dataset.value}"]`)
            option.selected = true
            option.setAttribute('selected', '')
            this.__selectedOptions[li.dataset.value] = li.textContent
        }

        li.classList.toggle('selected')
    }

    __isLiOptionSelected(li) {
        return !!this.__selectedOptions[li.dataset.value]
    }

    __changeByLi(li) {
        this.__selectLiOption(li)
        updateFieldValue(this.__inputReadonly, li.textContent)

        this.__onChange()
    }

    changeTo(value) {
        this.__changeByLi(this.__getLiOptionByValue(value))
    }

    changeToByTextContent(textContent) {
        this.__changeByLi(this.__optionByTextContent(textContent))
    }

    fill(options = this.__options) {
        this.__doEmptySelectAndList()
        const ul = document.createElement('ul')

        options.forEach(option => {
            this.__appendOptionInSelect(option)

            const li = document.createElement('li')

            li.dataset.value = option.value
            li.textContent = option.textContent

            li.addEventListener('click', () => {
                this.changeTo(option.value)
            })

            this.__selectElement.value = ''



            if(this.__isLiOptionSelected(li)) {
                li.classList.add('selected')
                ul.prepend(li)

                return
            }

            ul.appendChild(li)
        })

        this.__mySelectList.querySelector('ul').replaceWith(ul)
    }
}

export class MyMultipleSelect extends MySelect {
    __itemsSelectedCount = 0

    __selectLiOption(li) {
        const option = this.__selectElement.querySelector(`option[value="${li.dataset.value}"]`)

        if(li.classList.contains('selected')) {
            this.__itemsSelectedCount -= 1;
            option.selected = false
            delete this.__selectedOptions[option.value]
        } else {
            this.__itemsSelectedCount += 1;
            option.selected = true
            option.setAttribute('selected', '')
            this.__selectedOptions[option.value] = li.textContent
        }

        li.classList.toggle('selected')
    }



    changeToByTextContent(textContent) {
        if(textContent instanceof Array) {
            textContent.forEach(textToAppend => {
                if(textToAppend) {
                    this.__changeByLi(this.__optionByTextContent(textToAppend))
                }
            })

            return
        }

        this.__changeByLi(this.__optionByTextContent(textContent))
    }

    __changeByLi(li) {
        this.__selectLiOption(li)
        updateFieldValue(this.__inputReadonly, this.__getPlaceholder())

        this.__onChange()
    }

    changeTo(value) {
        const li = this.__getLiOptionByValue(value)

        this.__selectLiOption(li)
        updateFieldValue(this.__inputReadonly, this.__getPlaceholder())

        this.__onChange()
    }

    __getPlaceholder() {
        const customPlaceHolder = this.__inputReadonly.dataset.customPlaceholder || 'items selecionados'
        const itemsSelectedCountText = this.__itemsSelectedCount > 99 ? '99+' : this.__itemsSelectedCount

        return`${itemsSelectedCountText} ${customPlaceHolder}`
    }
}

MySelect.instances = {}
