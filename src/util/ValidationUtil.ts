import {CONTAINS_LETTER_REGEX, CONTAINS_NUMBER_REGEX} from "./Regex"

const PASSWORD_HAS_TO_BE_LONGER = "A senha precisa ter no mínimo 7 caracteres"
const PASSWORD_NEEDS_NUMBERS = "A senha precisa ter no mínimo 1 número"
const PASSWORD_NEEDS_LETTERS = "A senha precisa ter no mínimo 1 letra"
const PASSWORDS_DONT_MATCH = "As senhas inseridas não são iguais"
export const NO_ERROR = ""

export function getPasswordError(password: string, isRegister: boolean, confirmation?: string): string {
    if (!isRegister) return NO_ERROR
    if (confirmation) return password === confirmation ? NO_ERROR : PASSWORDS_DONT_MATCH

    if (password.length < 7) return PASSWORD_HAS_TO_BE_LONGER
    if (!CONTAINS_NUMBER_REGEX.test(password)) return PASSWORD_NEEDS_NUMBERS
    if (!CONTAINS_LETTER_REGEX.test(password)) return PASSWORD_NEEDS_LETTERS
    return NO_ERROR
}
