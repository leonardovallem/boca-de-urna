export default function isAuthenticated() {
    return !!localStorage.getItem("user")
}

export function authenticate(cpf: string) {
    localStorage.setItem("user", cpf)
    window.location.assign("/")
}