import SnackbarLevel from "./SnackbarLevel"

export default class SnackbarState {
    open: boolean
    message: string
    level: SnackbarLevel

    constructor(message: string, level: SnackbarLevel, open: boolean) {
        this.message = message
        this.level = level
        this.open = open
    }

    static showError(message: string) {
        return new SnackbarState(message, "error", true)
    }

    static showSuccess(message: string) {
        return new SnackbarState(message, "success", true)
    }

    static showWarning(message: string) {
        return new SnackbarState(message, "warning", true)
    }

    static showInfo(message: string) {
        return new SnackbarState(message, "info", true)
    }

    close() {
        this.open = false
        return this
    }
}