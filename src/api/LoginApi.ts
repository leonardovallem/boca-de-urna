import {BASE_API} from "./Base"
import Axios from "axios"

const BASE_ENDPOINT = "/user"
const LOGIN_ENDPOINT = "/login"
const REGISTER_ENDPOINT = "/register"

const axios = Axios.create({baseURL: BASE_API + BASE_ENDPOINT})

export default class LoginApi {
    private isRegister: boolean
    private endpoint: string

    private constructor(endpoint: string, isRegister: boolean) {
        this.endpoint = endpoint
        this.isRegister = isRegister
    }

    static login() {
        return new LoginApi(LOGIN_ENDPOINT, false)
    }

    static register() {
        return new LoginApi(LOGIN_ENDPOINT, true)
    }

    async withData(body: any) {
        return axios.post(
            this.isRegister ? REGISTER_ENDPOINT : LOGIN_ENDPOINT,
            body,
            {headers: {"Content-Type": "application/json"}}
        )
    }
}