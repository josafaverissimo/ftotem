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

    if(!formValidation.run()) {
        formValidation.showErrorsInForm()

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
    })
})