import { MyTable, TableEvent } from "./myTable/main.js";
import { FormValidation } from "./utils/formvalidation.js";

export class ManagerPage {
    /** @type string */
    __tableId
    /** @type MyTable */
    __mainTable
    /** @type HTMLFormElement */
    __formAction
    /** @type FormValidation */
    __formValidation
    __managerRequester
    __currentPage = 1
    __currentTerm = ''
    __order = 'desc'
    __orderColumn = 'id'
    __pageCount

    setRequester(requester) {
        this.__managerRequester = requester
    }

    setMainTable(tableId, createFormTitle, editFormTitle) {
        this.__tableId = tableId
        this.__mainTable = new MyTable()
        this.__mainTable.setCreateFormTitle(createFormTitle)
        this.__mainTable.setEditFormTitle(editFormTitle)
        this.__mainTable.currentPage = this.__currentPage
        this.__mainTable.onSearch = this.__onTableEvent.bind(this)
        this.__mainTable.onSearchClear = this.__onTableEvent.bind(this)
        this.__mainTable.onChangePage = this.__onTableEvent.bind(this)
        this.__mainTable.onOrderBy = this.__onTableEvent.bind(this)
        this.__mainTable.onCreate = this.__onTableFormCreate.bind(this)
        this.__mainTable.onEdit = this.__onTableFormEdit.bind(this)
        this.__mainTable.onDelete = this.__onTableDelete.bind(this)
        this.__mainTable.loadTable(this.__tableId)
        this.__formAction = this.__mainTable.formAction
    }

    setFormValidation(validations) {
        this.__formValidation = new FormValidation()
        this.__formValidation.setForm(this.__formAction)
        this.__formValidation.setValidationsByFields(validations)
    }

    getData() {
        this.__mainTable.orderBy('id', 'desc')
    }

    /**
     *
     * @param tableEvent {TableEvent}
     * @private
     */
    __onTableEvent(tableEvent) {
        const {term, page, order, orderColumn} = tableEvent

        this.__currentTerm = term
        this.__currentPage = page
        this.__order = order
        this.__orderColumn = orderColumn

        this.__loadTableData()
    }

    __onTableDelete(rows, callback = () => {}) {
        this.__managerRequester.delete(rows.map(row => Number(row.id)), response => {
            const { data } = response

            if(data.success) {
                this.__loadTableData()

                callback()
            }
        })
    }

    __validateForm() {
        const validation = this.__formValidation.run()

        if(!validation) {
            this.__formValidation.showErrorsInForm()
        }

        return validation
    }

    __onTableFormCreate(formData, event) {
        this.__onTableFormSubmit(formData, event, 'Usuário cadastrado!', false)
    }

    __onTableFormEdit(formData, event) {
        this.__onTableFormSubmit(formData, event, 'Usuário editado!', true)
    }

    __onTableFormSubmit(formData, event, successMessage, editMode) {
        event.submitter.classList.add('disabled')

        if(!editMode) {
            if (!this.__validateForm()) {
                setTimeout(() => {
                    event.submitter.classList.remove('disabled')
                }, 1000)
                return
            }
        }

        this.__managerRequester.save(formData, response => {
            const { data } = response

            setTimeout(() => {
                event.submitter.classList.remove('disabled')
            }, 1000)

            if(!data.success) {
                this.__formValidation.formErrorMessages = data.errors
                this.__formValidation.showErrorsInForm()

                return
            }

            toastify(successMessage, 'success')

            this.__mainTable.closeModal()

            this.__loadTableData()
        })
    }

    __loadTableData() {
        this.__mainTable.disableTable()

        this.__managerRequester.get(response => {
            const { data } = response
            this.__pageCount = data.pageCount

            if(this.__pageCount > 0) {
                this.__mainTable.loadTableData(data)
            } else {
                toastify('Nenhum dado encontrado', 'info')
                this.__mainTable.dataNotFound()
            }

            this.__mainTable.enableTable()
        }, {
            page: this.__currentPage,
            term: this.__currentTerm,
            order: this.__order,
            orderBy: this.__orderColumn
        })
    }
}
