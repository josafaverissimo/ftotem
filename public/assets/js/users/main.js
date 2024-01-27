import { MyTable } from "../myTable/main.js";
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

    constructor() {
        this.__init()
    }

    __init() {
        this.__tableId = 'usersTable'
        this.__mainTable = new MyTable()
        this.__mainTable.loadTable(this.__tableId)
        this.__formAction = this.__mainTable.formAction
        this.__setFormValidation()
        this.__usersServices = new UsersService()
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

    validateForm() {
        const validation = this.__formValidation.run()

        if(!validation) {
            this.__formValidation.showErrorsInForm()
        }

        return validation
    }

    listenFormAction() {
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
    }

    togglePasswordInput() {
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
}
