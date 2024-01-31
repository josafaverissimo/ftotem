import {ManagerPage} from "../managerPage.js";

export class UserPage extends ManagerPage {
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
