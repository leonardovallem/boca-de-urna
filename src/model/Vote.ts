export enum Vote {
    LULA = 13,
    BOLSONARO = 22,
    CIRO = 45,
    SIMONE_TEBET = 15,
    OUTRO = Number.MAX_SAFE_INTEGER,
    NULO = 0,
    NONE = -1
}

export const parse = (vote: string) => {
    switch (vote) {
    case "LULA":
        return Vote.LULA
    case "BOLSONARO":
        return Vote.BOLSONARO
    case "CIRO":
        return Vote.CIRO
    case "SIMONE_TEBET":
        return Vote.SIMONE_TEBET
    case "OUTRO":
        return Vote.OUTRO
    case "NULO":
        return Vote.NULO
    }

    return Vote.NONE
}

export const stringify = (vote: Vote) => {
    switch (vote) {
    case Vote.LULA:
        return "LULA"
    case Vote.BOLSONARO:
        return "BOLSONARO"
    case Vote.CIRO:
        return "CIRO"
    case Vote.SIMONE_TEBET:
        return "SIMONE_TEBET"
    case Vote.OUTRO:
        return "OTHER"
    case Vote.NULO:
        return "NULL"
    }

    return "NONE"
}