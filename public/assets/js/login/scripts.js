import {Requester} from "../utils/requester.js";
import {FormValidation} from "../utils/formvalidation.js";

const form = document.querySelector('form')
const requester = new Requester()
const formValidation = new FormValidation()

formValidation.setForm(form)
formValidation.setValidationsByFields([
    {name: 'username', nativeValidations: ['isRequired']},
    {name: 'password', nativeValidations: ['isRequired']}
])

form.addEventListener('submit', event => {
    event.preventDefault()
    event.submitter.classList.add('pe-none')
    event.submitter.firstChild.classList.add('d-none')
    event.submitter.lastChild.classList.remove('d-none')

    if(!formValidation.run()) {
        formValidation.showErrorsInForm()

        event.submitter.classList.remove('pe-none')
        event.submitter.firstChild.classList.remove('d-none')
        event.submitter.lastChild.classList.add('d-none')

        return
    }

    const formData = new FormData(form)

    requester.post('/login/doLogin', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(response => {
        if(!response.data.success) {
            toastify('Credencial incorreta', 'danger')

            return
        }

        window.location.href = '/'
    }).finally(() => {
        event.submitter.classList.remove('pe-none')
        event.submitter.firstChild.classList.remove('d-none')
        event.submitter.lastChild.classList.add('d-none')
    })
})