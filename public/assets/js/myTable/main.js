export class MyTable {
    __table
    __tableColumnsName = []
    __formAction
    __searchInput
    __currentPage
    __pageCount
    __order
    __orderColumnName
    __onSearch = () => {}
    __onSearchClear = () => {}
    __onChangePage = () => {}
    __onOrderBy = () => {}
    __onDelete = () => {}
    __onEdit = () => {}
    __onCreate = () => {}
    /** @type CheckedRows */
    __checkedRows
    __editForm = false
    __createFormTitle = ''
    __editFormTitle = ''

    get formAction() {
        return this.__formAction
    }

    set onSearch(callback) {
        this.__onSearch = callback
    }

    set onSearchClear(callback) {
        this.__onSearchClear = callback
    }

    set onChangePage(callback) {
        this.__onChangePage = (pageNumber) => {
            this.__currentPage = pageNumber
            this.__resetCheckedRows()

            callback(this.__getTableEvent())
        }
    }

    set onOrderBy(callback) {
        this.__onOrderBy = callback
    }

    set onDelete(callback) {
        this.__onDelete = callback
    }

    set onEdit(callback) {
        this.__onEdit = callback
    }

    set onCreate(callback) {
        this.__onCreate = callback
    }

    set currentPage(pageNumber) {
        this.__currentPage = pageNumber
    }

    setCreateFormTitle(title) {
        this.__createFormTitle = title
    }

    setEditFormTitle(title) {
        this.__editFormTitle = title
    }

    orderBy(column, order) {
        this.__order = order
        this.__orderColumnName = column
        this.__resetCheckedRows()
        const tableEvent = this.__getTableEvent()
        const th = [].find.call(this.__table.querySelectorAll('th'), th => th.textContent === column)

        th.dataset.order = th.dataset.order === 'asc' ? 'desc' : 'asc'

        this.__onOrderBy(tableEvent)
    }

    __setTable(tableId) {
        this.__table = document.getElementById(tableId)
    }

    __setFormAction(table) {
        this.__formAction = table.querySelector('.mytable__form-action')
    }

    __setSearchInput(table) {
        this.__searchInput = table.querySelector('#mytable__actions__search')
    }

    __getTableEvent() {
        const tableEvent = new TableEvent()

        tableEvent.term = this.__searchInput.value
        tableEvent.page = this.__currentPage
        tableEvent.order = this.__order
        tableEvent.orderColumn = this.__orderColumnName

        return tableEvent
    }

    loadTable(tableId) {
        this.__setTable(tableId)
        this.__setFormAction(this.__table)
        this.__setSearchInput(this.__table)
        this.__listenSearchInputSubmit()
        this.__listenSearchClearClick()
        this.__listenColumnOrderClick()
        this.__listenActionsClick()
        this.__checkedRows = new CheckedRows(this.__tableColumnsName)
        this.__listenCloseModal()
        this.__listenFormAction()
    }

    __getFormActionData() {
        return new FormData(this.__formAction)
    }

    __getEditFormData() {
        const editFormData = new FormData(this.__formAction)
        const [row] = Object.values(this.__checkedRows.rows)
        delete row.id

        Array.prototype.forEach.call(this.__formAction.elements, input => {
            if(input.value === row[input.name] || input.value === '') {
                editFormData.delete(input.name)
            }
        })

        return editFormData
    }

    __listenFormAction() {
        this.__formAction.addEventListener('submit', event => {
            event.preventDefault()

            let formData

            if(!this.__editForm) {
                formData = this.__getFormActionData()
            } else {
                formData = this.__getEditFormData()
                const formDataLength = Array.from(formData.keys()).length

                if(formDataLength <= 1) {
                    toastify('Altere algum valor', 'warning')
                    return
                }
            }

            this.__editForm ? this.__onEdit(formData, event) : this.__onCreate(formData, event)
        })
    }

    closeModal() {
        const modal = bootstrap.Modal.getOrCreateInstance(this.__table.querySelector('#mytable__form-modal'))

        modal.hide()
    }

    clearFormValues() {
        [].forEach.call(this.__formAction.elements, input => {
            updateFieldValue(input, '')
        })
    }

    __listenCloseModal() {
        const modal = this.__table.querySelector('#mytable__form-modal')

        modal.addEventListener('hidden.bs.modal', () => {
            const inputId = this.__formAction.id

            if(inputId) {
                inputId.remove()
            }
        })
    }

    __setIdInEditForm(id) {
        const input = document.createElement('input')
        input.id = 'mytable__form-input-id'
        input.value = id
        input.type = 'hidden'
        input.name = 'id'

        this.__formAction.appendChild(input)
    }

    __fillFormAction(valuesByInputName) {
        if(valuesByInputName.id) {
            this.__setIdInEditForm(valuesByInputName.id)
        }

        Object.keys(valuesByInputName).forEach(inputName => {
            if(this.__formAction[inputName]) {
                updateFieldValue(this.__formAction[inputName], valuesByInputName[inputName])
            }
        })
    }

    __changeFormTitle(title) {
        this.__table.querySelector('#mytable__form-modal .mytable__form-modal-title').textContent = title
    }

    __listenActionsClick() {
        const createButton = this.__table.querySelector('#mytable__actions-create')
        const editButton = this.__table.querySelector('#mytable__actions-edit')
        const deleteButton = this.__table.querySelector('#mytable__actions-delete')

        createButton.addEventListener('click', () => {
            this.__editForm = false
            this.__changeFormTitle(this.__createFormTitle)
        })

        editButton.addEventListener('click', () => {
            this.__editForm = true
            this.__changeFormTitle(this.__editFormTitle)


            if(this.__checkedRows.size > 1) {
                toastify('Selecione apenas um registro', 'warning')
                return
            } else if(this.__checkedRows.size === 0) {
                toastify('Selecione algum registro', 'warning')
                return
            }

            const bsModal = new bootstrap.Modal(this.__table.querySelector('#mytable__form-modal'))
            const [ row ] = Object.values(this.__checkedRows.rows)

            this.__fillFormAction(row)
            bsModal.show()
        })

        deleteButton.addEventListener('click', () => {
            this.__onDelete(Object.values(this.__checkedRows.rows), () => {
                if(this.__currentPage === this.__pageCount) {
                    this.__currentPage--
                }
            })
        })
    }

    __getCheckbox(id) {
        const checkbox = document.createElement('input')
        checkbox.id = id
        checkbox.type = 'checkbox'
        checkbox.classList.add('form-check-input')

        return checkbox
    }

    __listenColumnOrderClick() {
        const headers = this.__table.querySelectorAll('th')
        headers.forEach(th => {
            th.setAttribute('role', 'button')

            const arrowDownUp = document.createElement('i')
            arrowDownUp.classList.add('bi', 'bi-arrow-down-up', 'ms-2')

            th.appendChild(arrowDownUp)

            th.addEventListener('click', () => {
                if(!th.dataset.order) {
                    th.dataset.order = 'desc'
                }

                this.__order = th.dataset.order
                this.__orderColumnName = th.textContent

                this.__resetCheckedRows()
                const tableEvent = this.__getTableEvent()

                th.dataset.order = th.dataset.order === 'asc' ? 'desc' : 'asc'

                this.__onOrderBy(tableEvent)
            })

            this.__tableColumnsName.push(th.textContent)
        })

        const firstHeader = headers[0]
        const checkbox = this.__getCheckbox(`${this.__table.id}__header-checkbox`)
        firstHeader.classList.add('d-flex', 'align-items-center')

        firstHeader.insertBefore(checkbox, firstHeader.firstChild)

        checkbox.addEventListener('click', event => {
            event.stopPropagation()

            if(checkbox.checked) {
                this.__table.querySelectorAll('tbody tr input[type="checkbox"]').forEach(rowCheckbox => {
                    rowCheckbox.checked = true
                    this.__checkedRows.append(rowCheckbox.id)
                })
            } else {
                this.__resetCheckedRows()
            }
        })
    }

    __getRowElementByRowValues(rowValues, rowIndex) {
        const tr = document.createElement('tr')

        const firstCellName = rowValues.shift()
        const td = this.__getFirstCellRowWithCheckBox(firstCellName, rowIndex)
        tr.appendChild(td)

        rowValues.forEach(cell => {
            const td = document.createElement('td')
            td.textContent = cell

            tr.appendChild(td)
        })


        tr.addEventListener('click', () => {
            const rowCheckboxId = `${this.__table.id}__row-${rowIndex}`
            const rowCheckbox = this.__table.querySelector(`#${rowCheckboxId}`)
            const headCheckbox = this.__table.querySelector(`#${this.__table.id}__header-checkbox`)
            const totalRows = this.__table.querySelectorAll('tbody tr').length

            rowCheckbox.checked = !rowCheckbox.checked

            if(rowCheckbox.checked) {
                this.__checkedRows.append(rowCheckboxId)

                if(this.__checkedRows.size === totalRows) {
                    headCheckbox.indeterminate = false
                    headCheckbox.checked = true
                } else {
                    headCheckbox.indeterminate = true
                }
            } else {
                this.__checkedRows.delete(rowCheckboxId)

                if(this.__checkedRows.size === 0) {
                    headCheckbox.checked = false
                    headCheckbox.indeterminate = false
                } else {
                    headCheckbox.indeterminate = true
                }
            }
        })

        return tr
    }

    __resetCheckedRows() {
        const headerCheckbox = this.__table.querySelector(`#${this.__table.id}__header-checkbox`)
        this.__checkedRows = new CheckedRows(this.__tableColumnsName)
        headerCheckbox.indeterminate = false
        headerCheckbox.checked = false

        this.__table.querySelectorAll('tbody tr input[type="checkbox"]').forEach(rowCheckbox => {
            rowCheckbox.checked = false
        })
    }

    __listenSearchClearClick() {
        this.__table.querySelector('.mytable__action__search-clear').addEventListener('click', () => {
            this.__searchInput.value = ''

            this.__currentPage = 1
            this.__resetCheckedRows()
            const tableEvent = this.__getTableEvent()

            this.__onSearchClear(tableEvent)
        })
    }

    __listenSearchInputSubmit() {
        const [label] = this.__searchInput.labels
        label.addEventListener('click', () => {
            label.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower', 'pe-none')

            setTimeout(function() {
                label.classList.remove('animate__animated', 'animate__fadeIn', 'animate__slower', 'pe-none')
            }, 2000)

            this.__currentPage = 1
            this.__resetCheckedRows()
            const tableEvent = this.__getTableEvent()


            this.__onSearch(tableEvent)
        })
    }

    disableTable() {
        this.__table.classList.add('mytable__disabled')
    }

    enableTable() {
        this.__table.classList.remove('mytable__disabled')
    }

    __clearTableData() {
        this.__resetCheckedRows()
        this.__table.querySelectorAll('tbody tr').forEach(tr => tr.remove())
    }

    __getHeaderCheckbox() {
        return this.__table.querySelector(`#${this.__table.id}__header-checkbox`)
    }

    __getFirstCellRowWithCheckBox(cellName, rowIndex) {
        const td = document.createElement('td')
        const checkboxId = `${this.__table.id}__row-${rowIndex}`
        const checkbox = this.__getCheckbox(checkboxId)
        const headerCheckbox = this.__getHeaderCheckbox()
        const label = document.createElement('label')

        checkbox.setAttribute('name', `${this.__table.id}__row`)

        checkbox.addEventListener('click', () => checkbox.checked = !checkbox.checked)

        if(this.__checkedRows[checkboxId] || headerCheckbox.checked) {
            checkbox.checked = true
        }

        td.classList.add('d-flex', 'align-items-center')
        label.textContent = cellName
        label.setAttribute('for', checkbox.id)

        td.appendChild(checkbox)
        td.appendChild(label)

        return td
    }

    __clearPagination() {
        this.__table.querySelectorAll('.mytable__pagination__wrapper').forEach(wrapper => wrapper.innerHTML = '')
    }

    __showPagination() {
        this.__clearPagination()

        const pagination = new Pagination(this.__currentPage, this.__pageCount, this.__onChangePage)

        this.__table.querySelectorAll('.mytable__pagination__wrapper').forEach(wrapper => {
            const paginationContainer = pagination.getPagination()
            wrapper.appendChild(paginationContainer)
        })
    }

    loadTableData(tableData) {
        this.__pageCount = tableData.pageCount
        this.__clearTableData()
        this.__showPagination()

        const tbody = this.__table.querySelector('tbody')

        tableData.data.forEach((row, rowIndex) => {
            const rowElement = this.__getRowElementByRowValues(Object.values(row), rowIndex)

            tbody.appendChild(rowElement)
        })
    }

    dataNotFound() {
        this.__clearTableData()

        const tbody = this.__table.querySelector('tbody')
        const tr = document.createElement('tr')
        const td = document.createElement('td')

        td.textContent = 'Nenhum dado encontrado'
        td.classList.add('text-center')
        td.colSpan = this.__tableColumnsName.length
        tr.appendChild(td)
        tbody.appendChild(tr)
    }
}

class CheckedRows {
    __size = 0
    __rows = {}
    __columnsName

    constructor(columnsName) {
        this.__columnsName = columnsName
    }

    get size() {
        return this.__size
    }

    get rows() {
        return this.__rows
    }

    append(checkboxId) {
        const rowChildren = document.getElementById(checkboxId).parentNode.parentNode.children
        this.__rows[checkboxId] = [].reduce.call(rowChildren, (row, cell, cellIndex) => {
            row[this.__columnsName[cellIndex]] = cell.textContent

            return row
        }, {})

        this.__size++
    }

    delete(checkboxId) {
        delete this.__rows[checkboxId]

        this.__size--
    }
}

export class TableEvent {
    __term
    __page
    __order
    __orderColumn

    set term(value) {
        this.__term = value
    }

    get term() {
        return this.__term
    }

    set page(value) {
        this.__page = value
    }

    get page() {
        return this.__page
    }

    set order(value) {
        this.__order = value
    }

    get order() {
        return this.__order
    }

    set orderColumn(value) {
        this.__orderColumn = value
    }

    get orderColumn() {
        return this.__orderColumn
    }
}

export class Pagination {
    constructor(currentPage, pageCount, callback) {
        this.__currentPage = currentPage
        this.__pageCount = pageCount
        this.__onChange = callback
    }

    __getChangePageButton(pageNumber, child) {
        const button = document.createElement('button')
        button.classList.add('mytable__pagination__page-item')

        if(pageNumber === this.__currentPage) {
            button.classList.add('mytable__pagination__active')
        }

        button.addEventListener('click', () => {
            this.__onChange(pageNumber)
        })

        button.appendChild(child)

        return button
    }

    __hasPrevious() {
        return this.__currentPage > 1;
    }

    __hasNext() {
        return this.__currentPage < this.__pageCount
    }

    __getFirstPaginationNumber() {
        const firstPaginationNumber = this.__hasPrevious() ? this.__currentPage - 1 : 1
        const lastPaginationNumber = firstPaginationNumber + 1

        return firstPaginationNumber > 1 && lastPaginationNumber === this.__pageCount ?
            firstPaginationNumber - 1 : firstPaginationNumber
    }

    __getLastPaginationNumber() {
        const lastPaginationNumber = this.__hasNext() ? this.__currentPage + 1 : this.__currentPage;
        const firstPaginationNumber = lastPaginationNumber - 1

        return lastPaginationNumber < this.__pageCount && firstPaginationNumber === 1 ?
            lastPaginationNumber + 1 : lastPaginationNumber
    }

    __getPreviousPageButton() {
        const li = document.createElement('li')

        const icon = document.createElement('i')
        icon.classList.add('bi', 'bi-chevron-double-left')

        const button = this.__getChangePageButton(this.__currentPage - 2, icon)
        button.classList.add('mytable__pagination-disabled')
        li.appendChild(button)

        return li
    }

    __getNextPageButton() {
        const li = document.createElement('li')

        const icon = document.createElement('i')
        icon.classList.add('bi', 'bi-chevron-double-right')

        const button = this.__getChangePageButton(this.__currentPage + 2, icon)
        button.classList.add('mytable__pagination-disabled')
        li.appendChild(button)

        return li
    }

    __getThreeDotsItem() {
        const li = document.createElement('li')

        const button = document.createElement('button')
        button.classList.add('mytable__pagination__page-item', 'pe-none')
        li.appendChild(button)

        const threeDotsIcon = document.createElement('i')
        threeDotsIcon.classList.add('bi', 'bi-three-dots', 'mytable__pagination__page-item')
        button.appendChild(threeDotsIcon)

        return li
    }

    getPagination() {
        const container = document.createElement('nav')
        const ul = document.createElement('ul')
        ul.classList.add('mytable__pagination')
        container.appendChild(ul)

        const firstPageNumber = this.__getFirstPaginationNumber();
        const lastPageNumber = this.__getLastPaginationNumber();

        const previousPageItem = this.__getPreviousPageButton()
        const nextPageItem = this.__getNextPageButton()

        ul.appendChild(previousPageItem)

        if(firstPageNumber > 1) {
            const threeDotsItem = this.__getThreeDotsItem()

            const li = document.createElement('li')
            ul.appendChild(li)
            ul.appendChild(threeDotsItem)

            const span = document.createElement('span')
            span.textContent = '1'

            const firstButton = this.__getChangePageButton(1, span)
            li.appendChild(firstButton)

            previousPageItem.querySelector('button').classList.remove('mytable__pagination-disabled')
        }

        for(let pageNumber = firstPageNumber; pageNumber <= lastPageNumber; pageNumber++) {
            const li = document.createElement('li')
            ul.appendChild(li)

            const span = document.createElement('span')
            span.textContent = pageNumber

            const button = this.__getChangePageButton(pageNumber, span)

            li.appendChild(button)

            ul.appendChild(li)
        }

        if(lastPageNumber < this.__pageCount) {
            const threeDotsItem = this.__getThreeDotsItem()
            const li = document.createElement('li')
            ul.appendChild(threeDotsItem)
            ul.appendChild(li)

            const span = document.createElement('span')
            span.textContent = this.__pageCount

            const lastButton = this.__getChangePageButton(this.__pageCount, span)
            li.appendChild(lastButton)

            nextPageItem.querySelector('button').classList.remove('mytable__pagination-disabled')
        }

        ul.append(nextPageItem)

        return container
    }
}
