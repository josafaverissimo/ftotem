export class MyTable {
    __table
    __formAction
    __searchInput
    __currentPage
    __onSearch
    __onSearchClear
    __onChangePage

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
            callback(pageNumber)
        }
    }

    set currentPage(pageNumber) {
        this.__currentPage = pageNumber
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

        return tableEvent
    }

    loadTable(tableId) {
        this.__setTable(tableId)
        this.__setFormAction(this.__table)
        this.__setSearchInput(this.__table)
        this.__listenSearchInputSubmit()
        this.__listenSearchClearClick()
    }

    __listenSearchClearClick() {
        this.__table.querySelector('.mytable__action__search-clear').addEventListener('click', () => {
            this.__searchInput.value = ''
            this.__onSearchClear()
        })
    }

    __listenSearchInputSubmit() {
        const [label] = this.__searchInput.labels
        label.addEventListener('click', () => {
            label.classList.add('animate__animated', 'animate__fadeIn', 'animate__slower', 'pe-none')

            setTimeout(function() {
                label.classList.remove('animate__animated', 'animate__fadeIn', 'animate__slower', 'pe-none')
            }, 3000)

            const tableEvent = this.__getTableEvent()
            this.__currentPage = 1


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
        this.__table.querySelectorAll('tbody tr').forEach(tr => tr.remove())
    }

    __getRowElementByRowValues(rowValues) {
        const tr = document.createElement('tr')

        rowValues.forEach(cell => {
            const td = document.createElement('td')
            td.textContent = cell

            tr.appendChild(td)
        })

        return tr
    }

    __clearPagination() {
        this.__table.querySelectorAll('.mytable__pagination__wrapper').forEach(wrapper => wrapper.innerHTML = '')
    }

    __showPagination(pageCount) {
        this.__clearPagination()

        const pagination = new Pagination(this.__currentPage, pageCount, this.__onChangePage)

        this.__table.querySelectorAll('.mytable__pagination__wrapper').forEach(wrapper => {
            const paginationContainer = pagination.getPagination()
            wrapper.appendChild(paginationContainer)
        })
    }

    loadTableData(tableData) {
        this.__clearTableData()
        this.__showPagination(tableData.pageCount)

        const tbody = this.__table.querySelector('tbody')

        tableData.data.forEach(row => {
            const rowElement = this.__getRowElementByRowValues(Object.values(row))

            tbody.appendChild(rowElement)
        })
    }
}

export class TableEvent {
    __term

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
