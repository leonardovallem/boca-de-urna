import Candidate, {Nenhum} from "./Candidate"

export enum Gender {
    Female, Male, Other
}

export default class User {
    name: string
    cpf: string
    email: string
    gender: Gender
    age: number
    vote: Candidate = Nenhum

    constructor(name: string, cpf: string, email: string, gender: Gender, age: number, vote: Candidate = Nenhum) {
        this.name = name
        this.cpf = cpf
        this.email = email
        this.gender = gender
        this.age = age
        this.vote = vote
    }
}