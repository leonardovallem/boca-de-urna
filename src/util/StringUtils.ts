export function truncate(str: string, limit = 20) {
    return (str.length > limit) ? str.slice(0, limit - 1) + "..." : str
}