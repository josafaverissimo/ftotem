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

String.prototype.removeAccents = function() {
    return this.toString()
        .replace(/[àáâã]/g, "a")
        .replace(/[éê]/g, "e")
        .replace(/í/g, "i")
        .replace(/[óôõ]/g, "o")
        .replace(/ú/g, "u")
        .replace(/ç/g, "c")
        .replace(/[ÀÁÂÃ]/g, "A")
        .replace(/[ÉÊ]/g, "E")
        .replace(/Í/g, "I")
        .replace(/[ÓÔÕ]/g, "O")
        .replace(/ÚÜ/g, "U")
        .replace(/Ç/g, "C")
}
