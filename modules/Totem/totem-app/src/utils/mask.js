import IMask from "imask";

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

const instances = {}

function fireEvent (input, eventName) {
    const event = new CustomEvent(eventName, {
        detail: {
            value: input.value
        }
    })

    input.dispatchEvent(event);
}

export const useMask = () => ({
    vMask: (input, binding) => {
        const maskName = binding.arg
        const iMask = IMask(input, {
            mask: masksByName[maskName]
        }).on('accept', () => fireEvent(input, 'accept'))
            .on('complete', () => fireEvent(input, 'complete'))


        instances[input.id] = iMask
    }
})
