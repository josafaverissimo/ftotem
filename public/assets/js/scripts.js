document.querySelectorAll('input[data-mask]').forEach(input => {
    const { mask } = input.dataset
    const masksByName = {
        alphaspaces: /^[a-zA-ZÀ-ÿ ]+$/,
        alphanumeric: /^[a-zA-ZÀ-ÿ_0-9]+$/,
        cpf: '000.000.000-00',
        cellphone: '(00) 9 0000-0000'
    }

    if(!masksByName[mask]) {
        return
    }

    IMask(input, {
        mask: masksByName[mask]
    })
})