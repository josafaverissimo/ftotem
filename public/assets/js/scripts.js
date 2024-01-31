let inputMasks = {}

function updateFieldValue(field, value) {
    field.value = value

    if(inputMasks[field.id]) {
        inputMasks[field.id].updateValue()
    }
}

document.querySelectorAll('input[data-mask]').forEach(input => {
    const { mask } = input.dataset
    const masksByName = {
        alphaspaces: /^[a-zA-ZÀ-ÿ ]+$/,
        alphanumeric: /^[a-zA-Z0-9]+$/,
        alhpanumericspacesdots: /^[a-zA-ZÀ-ÿ .]+$/,
        alphanumericdashsdots: /^[a-zA-ZÀ-ÿ_0-9\-.]+$/,
        numeric: /^[0-9]+$/,
        cpf: '000.000.000-00',
        cep: '00000-000',
        cellphone: '(00) 9 0000-0000',
    }

    if(!masksByName[mask]) {
        return
    }

    inputMasks[input.id] = IMask(input, {
        mask: masksByName[mask]
    })
})