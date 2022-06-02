import {Vote} from "./Vote"
import Party from "./Party"

export default class Candidate {
    name: string
    picture: string | null
    party: Party | null
    vote: Vote

    constructor(
        name: string,
        picture: string | null,
        vote: Vote,
        party: Party | null
    ) {
        this.name = name
        this.picture = picture
        this.vote = vote
        this.party = party
    }

    isValid = () => this.vote !== Vote.OUTRO && this.vote !== Vote.NONE && this.vote !== Vote.NULO

    static fromVote(vote: Vote): Candidate {
        let name = "Nulo", code: number | null = null, picture: string | null = null
        let party: Party | null = null

        switch (vote) {
        case Vote.LULA:
            name = "Luís Inácio Lula da Silva"
            code = vote
            picture = "https://www.cartacapital.com.br/wp-content/uploads/2022/05/lula-time.png"
            party = new Party("Partido dos Trabalhadores",
                "PT",
                13,
                "https://logodownload.org/wp-content/uploads/2016/09/pt-logo-2.png",
                "red",
                "red"
            )
            break
        case Vote.BOLSONARO:
            name = "Jair Messias Bolsonaro"
            code = vote
            picture = "https://cdn.crusoe.com.br/uploads/2021/01/Reproducao-Redes-Sociais-e1610083447831.jpg"
            party = new Party("Partido Liberal",
                "PL",
                22,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Logomarca_do_Partido_Liberal.png/482px-Logomarca_do_Partido_Liberal.png",
                "green",
                "gold"
            )
            break
        case Vote.CIRO:
            name = "Ciro Gomes"
            code = vote
            picture = "https://www.cartacapital.com.br/wp-content/uploads/2021/11/Sem-T%C3%ADtulo-26.jpg"
            party = new Party("Partido Democrático Trabalhista",
                "PDT",
                12,
                "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/LogoPDT.svg/1200px-LogoPDT.svg.png",
                "blue",
                "blue"
            )
            break
        case Vote.SIMONE_TEBET:
            name = "Simone Tebet"
            code = vote
            picture = "https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2019/09/Simone-Tebet.jpeg"
            party = new Party("Movimento Democrático Brasileiro",
                "MDB",
                15,
                "http://web.camaradesaobras.al.gov.br/wp-content/uploads/2021/04/15_MDB-1024x734.png",
                "gold",
                "green"
            )
            break
        case Vote.OUTRO:
            name = "Outro candidato"
            picture = ""    // TODO
            break
        case Vote.NULO:
            name = "Voto nulo"
            picture = ""    // TODO
            break
        case Vote.NONE:
            name = "Você ainda não votou"
            picture = ""    // TODO
            break
        }

        return new Candidate(name, picture, vote, party)
    }
}

export const Lula = Candidate.fromVote(Vote.LULA)
export const Bolsonaro = Candidate.fromVote(Vote.BOLSONARO)
export const Ciro = Candidate.fromVote(Vote.CIRO)
export const SimoneTebet = Candidate.fromVote(Vote.SIMONE_TEBET)
export const Outro = Candidate.fromVote(Vote.OUTRO)
export const Nulo = Candidate.fromVote(Vote.NULO)
export const Nenhum = Candidate.fromVote(Vote.NONE)
