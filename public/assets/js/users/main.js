import { MyTable, TableEvent } from "../myTable/main.js";
import { FormValidation } from "../utils/formvalidation.js";
import { UsersService } from "../services/users.js";

export class UserPage {
    /** @type string */
    __tableId
    /** @type MyTable */
    __mainTable
    /** @type HTMLFormElement */
    __formAction
    /** @type FormValidation */
    __formValidation
    /** @type UsersService */
    __usersServices
    __currentPage = 1
    __currentTerm = ''

    constructor() {
        this.__init()
        this.__loadTableData()
        this.__listenFormAction()
    }

    __init() {
        this.__tableId = 'usersTable'
        this.__usersServices = new UsersService()
        this.__setMainTable()
        this.__formAction = this.__mainTable.formAction
        this.__setFormValidation()
    }

    __setMainTable() {
        this.__mainTable = new MyTable()
        this.__mainTable.currentPage = this.__currentPage
        this.__mainTable.onSearch = this.__onTableSearch.bind(this)
        this.__mainTable.onSearchClear = this.__onTableSearchClear.bind(this)
        this.__mainTable.onChangePage = this.changeTablePage.bind(this)
        this.__mainTable.loadTable(this.__tableId)
    }

    __setFormValidation() {
        this.__formValidation = new FormValidation()
        this.__formValidation.setForm(this.__formAction)
        this.__setUsersFormValidations()
    }

    __setUsersFormValidations() {
        this.__formValidation.setValidationsByFields([
            {
                name: 'name',
                nativeValidations: ['isRequired']
            },
            {
                name: 'username',
                nativeValidations: ['isRequired']
            },
            {
                name: 'password',
                nativeValidations: ['isRequired']
            },
            {
                name: 'cpf',
                nativeValidations: ['isRequired']
            },
            {
                name: 'cellphone',
                nativeValidations: ['isRequired']
            }
        ])
    }

    __getFormActionData() {
        return new FormData(this.__formAction)
    }

    /**
     *
     * @param tableEvent {TableEvent}
     * @private
     */
    __onTableSearch(tableEvent) {
        const {term} = tableEvent

        this.__currentTerm = term

        this.__loadTableData()
    }

    __onTableSearchClear() {
        this.__currentTerm = ''

        this.__loadTableData()
    }

    validateForm() {
        const validation = this.__formValidation.run()

        if(!validation) {
            this.__formValidation.showErrorsInForm()
        }

        return validation
    }

    __listenFormAction() {
        this.__formAction.addEventListener('submit', event => {
            event.preventDefault()

            event.submitter.classList.add('disabled')

            if(!this.validateForm()) {
                setTimeout(() => {
                    event.submitter.classList.remove('disabled')
                }, 1000)
                return
            }

            const formData = this.__getFormActionData()
            this.__usersServices.save(formData, response => {
                const { data } = response

                setTimeout(() => {
                    event.submitter.classList.remove('disabled')
                }, 1000)

                if(!data.success) {
                    this.__formValidation.formErrorMessages = data.errors
                    this.__formValidation.showErrorsInForm()


                    return
                }

                toastify('Usuário cadastrado!', 'success')
            })
        })

        this.__togglePasswordInput()
    }

    __togglePasswordInput() {
        const passwordInput = this.__formAction.password
        const passwordEyeContainer = passwordInput.nextElementSibling
        const passwordEyeIcon = passwordInput.nextElementSibling.firstElementChild

        passwordEyeContainer.addEventListener('click', () => {
            if(passwordInput.type === 'password') {
                passwordInput.type = 'text'
                passwordInput.placeholder = 'e.g.: 12345678'
                passwordEyeIcon.classList.remove('bi-eye-slash-fill')
                passwordEyeIcon.classList.add('bi-eye-fill')

                return
            }

            passwordInput.type = 'password'
            passwordInput.placeholder = 'e.g.: ********'
            passwordEyeIcon.classList.remove('bi-eye-fill')
            passwordEyeIcon.classList.add('bi-eye-slash-fill')
        })
    }

    __loadTableData() {
        this.__mainTable.disableTable()

        this.__usersServices.get(response => {
            const { data } = response

            if(data.pageCount > 0) {
                this.__mainTable.loadTableData(data)
            } else {
                toastify('Nenhum dado encontrado', 'info')
            }

            this.__mainTable.enableTable()
        }, {
            page: this.__currentPage,
            term: this.__currentTerm
        })
    }

    changeTablePage(pageNumber) {
        this.__currentPage = pageNumber

        this.__loadTableData()
    }
}
