import {BASE_API} from "./Base"
import Axios from "axios"
import {stringify, Vote} from "../model/Vote"

const BASE_ENDPOINT = "/vote"
const USER_ENDPOINT = "/user"

const axios = Axios.create({
    baseURL: BASE_API + BASE_ENDPOINT,
    headers: {"Content-Type": "application/json"}
})

export default class VotingApi {
    static vote(vote: Vote) {
        const user = localStorage.getItem("user")!

        return axios.post("/", {
            cpf: user,
            vote: stringify(vote)
        })
    }

    static retrieveData() {
        return axios.get("/")
    }

    static getUserVote(cpf: string) {
        return Axios.get(`${BASE_API + USER_ENDPOINT}/${cpf}`, {
            headers: {"Content-Type": "application/json"}
        })
    }
}