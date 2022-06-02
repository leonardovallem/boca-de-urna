function generateCPFDigit(cpf: string): string {
    let total = 0
    let reverse = cpf.length + 1

    for(const digit of cpf) {
        total += reverse * Number(digit)
        reverse--
    }

    const digit = 11 - (total % 11)
    return digit <= 9 ? String(digit) : "0"
}

export function validateCPF(cpf: string): boolean {
    const raw = cpf.replaceAll("-", "").replaceAll(".", "")

    if (raw.length !== 11) return false

    const cpfWithoutDigits = raw.slice(0, -2)
    const digit1 = generateCPFDigit(cpfWithoutDigits)
    const digit2 = generateCPFDigit(cpfWithoutDigits + digit1)

    return raw.slice(-2) === `${digit1}${digit2}`
}

export function cpfMask(value: string): string {
    value = value.replace(/\D/g,"")
    value = value.replace(/(\d{3})(\d)/,"$1.$2")
    value = value.replace(/(\d{3})(\d)/,"$1.$2")

    value = value.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return value
}