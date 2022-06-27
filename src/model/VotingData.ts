export default class VotingData {
    lula = 0
    bolsonaro = 0
    ciro = 0
    simoneTebet = 0
    others = 0
    nullVotes = 0

    constructor(lula = 0, bolsonaro = 0, ciro = 0, simoneTebet = 0, others = 0, nullVotes = 0) {
        this.lula = lula
        this.bolsonaro = bolsonaro
        this.ciro = ciro
        this.simoneTebet = simoneTebet
        this.others = others
        this.nullVotes = nullVotes
    }
}