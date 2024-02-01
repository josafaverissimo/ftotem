export class FormValidation {
    /** @type HTMLFormElement */
    __form
    /** @type Object */
    __formErrorMessages = {}
    /** @type Array */
    __validationsByFields
    /** @type Validations */
    __validations

    constructor() {
        this.__setValidations(new Validations())


    }

    get formErrorMessages() {
        return this.__formErrorMessages
    }

    set formErrorMessages(value) {
        this.__formErrorMessages = value
    }

    __hasFormErrorMessages() {
        return Object.keys(this.formErrorMessages).length > 0
    }

    __clearFormErrorMessages() {
        this.formErrorMessages = {}
    }

    __setValidations(validations) {
        this.__validations = validations
    }

    __getErrorTextElementByField(field) {
        return this.__form[field].closest('div[class^="col"]').querySelector('p.mytable__form-action-error-message')
    }

    __removeErrorsInForm() {
        this.__validationsByFields.forEach(({ name: field }) => {
            this.__getErrorTextElementByField(field).classList.remove('text-danger')
        })
    }

    setForm(form) {
        this.__form = form
    }

    setValidationsByFields(validationsByFields) {
        this.__validationsByFields = validationsByFields
    }

    run() {
        this.__clearFormErrorMessages()
        this.__removeErrorsInForm()

        this.__validationsByFields.forEach(field => {
            field.nativeValidations.forEach(validation => {
                const input = this.__form[field.name]
                this.__validations[validation](input)
            })
        })

        this.formErrorMessages = this.__validations.errorMessages
        this.__validations.clearErrorMessages()

        return !this.__hasFormErrorMessages()
    }

    showErrorsInForm() {
        const fields = Object.keys(this.formErrorMessages)

        if(fields.length > 0) {
            toastify('Há erros no formulário', 'warning')
        }

        fields.forEach(field => {
            const errorMessage = this.formErrorMessages[field]
            const errorTextElement = this.__getErrorTextElementByField(field)

            errorTextElement.textContent = errorMessage
            errorTextElement.classList.add('text-danger')
        })
    }
}

class Validations {
    __errorMessages = {}

    get errorMessages() {
        return this.__errorMessages
    }

    clearErrorMessages() {
        this.__errorMessages = {}
    }

    isRequired(input) {
        if(input.value === "") {
            this.__errorMessages[input.name] = "O campo é obrigatório"
            return false
        }

        return true
    }
}
