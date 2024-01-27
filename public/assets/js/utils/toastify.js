function toastify(message, status) {
    function getToastContainer() {
        let toastContainer = document.querySelector('.toast-container')

        if(!toastContainer) {
            toastContainer = document.createElement('div')
            toastContainer.setAttribute('class', 'toast-container position-fixed top-0 start-50 p-3 translate-middle-x')
            document.body.appendChild(toastContainer)
        }

        return toastContainer
    }

    const toastContainer = getToastContainer()
    const toast = document.createElement('div')

    toast.dataset.bsAnimation = false
    toast.dataset.bsAutohide = false
    toast.setAttribute('class', `toast align-items-center text-bg-${status} border-0 animate__animated animate__fadeInDown animate__fast`)
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <span>${message}</span>
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast">
            </button>
        </div>
    `

    toastContainer.appendChild(toast)
    bootstrap.Toast.getOrCreateInstance(toastContainer.lastElementChild).show()

    setTimeout(() => {
        toast.classList.remove('animate__fadeInDown')
        toast.classList.add('animate__fadeOutUp')
        setTimeout(() => {
            toast.remove()
        }, 800)
    }, 3000)
}