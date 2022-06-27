import React, {useEffect, useState} from "react"
import {Button, Chip, Divider, Grid, Slide, Stack, styled, TextField, Typography} from "@mui/material"
import {cpfMask, validateCPF} from "../../util/CPFUtil"
import UrnaImage from "./urna.jpeg"
import {EMAIL_REGEX} from "../../util/Regex"
import "./style.css"
import {getPasswordError, NO_ERROR} from "../../util/ValidationUtil"
import LoginApi from "../../api/LoginApi"
import Snackbar from "../../components/Snackbar"
import SnackbarState from "../../components/Snackbar/SnackbarState"
import isAuthenticated, {authenticate} from "../../util/AuthenticationUtil"
import {Navigate} from "react-router"

const StyledTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "#d2ab3e",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#d2ab3e",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "white",
        },
        "&:hover fieldset": {
            borderColor: "yellow",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#d2ab3e",
        },
    },
})

export default function LoginPage() {
    const [authenticated] = useState(isAuthenticated())

    const [imageWidth, setImageWidth] = useState(500)
    const [isRegister, setRegister] = useState(false)
    const [snackbarState, setSnackbarState] = useState<SnackbarState | null>(null)

    const [email, setEmail] = useState("")
    const [isInvalidEmail, setInvalidEmail] = useState(false)

    const [cpf, setCpf] = useState("")
    const [isInvalidCpf, setInvalidCpf] = useState(false)

    const [name, setName] = useState("")

    const [password, setPassword] = useState("")
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("")

    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [passwordConfirmationErrorMessage, setPasswordConfirmationErrorMessage] = useState("")

    function handleResize() {
        const loginInfo = document.getElementById("login-info")
        if (!loginInfo) return
        setImageWidth(loginInfo.clientWidth * 0.75)
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    function handleLogin() {
        const api = isRegister ? LoginApi.register() : LoginApi.login()
        api.withData({
            email,
            cpf,
            name,
            password,
        }).then(response => {
            authenticate(response.data)
        }).catch(err => {
            const response = err.response.data
            const msg = typeof response === "string"
                ? response
                : JSON.stringify(response)
            setSnackbarState(SnackbarState.showError(msg))
        })
    }

    function handleCPFInput(e: React.ChangeEvent<HTMLInputElement>) {
        setCpf(cpfMask(e.target.value))
        setInvalidCpf(isRegister && !validateCPF(e.target.value))
    }

    function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
        setInvalidEmail(isRegister && !EMAIL_REGEX.test(e.target.value))
    }

    function handlePasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
        setPasswordErrorMessage(getPasswordError(e.target.value, isRegister))
    }

    function handlePasswordConfirmationInput(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordConfirmation(e.target.value)
        setPasswordConfirmationErrorMessage(getPasswordError(password, isRegister, e.target.value))
    }

    function handleSnackbarClose() {
        setSnackbarState(prevState => prevState?.close() ?? null)
    }

    return authenticated ? <Navigate to="/"/>
        : <Grid container className="login-body">
            <Grid item xs={7} id="login-info">
                <Stack alignItems="center">
                    <Typography variant="h5">Obtenha um preview da democracia</Typography>

                    <img src={UrnaImage} width={imageWidth}/>
                </Stack>
            </Grid>
            <Grid item xs={5}>
                <Stack justifyContent="center"
                    alignItems="center"
                    height="100vh"
                    className="login-container"
                >
                    <Typography variant="h3">{isRegister ? "Cadastrar" : "Login"}</Typography>
                    <Typography variant="body1">{isRegister ? "Cadastre-se para votar" : "Realize seu login"}</Typography>

                    <Stack
                        spacing={2}
                        className="login-input-fields">
                        <Slide direction="left" in={isRegister} mountOnEnter unmountOnExit>
                            <StyledTextField label="CPF"
                                variant="outlined"
                                type="text"
                                value={cpf}
                                onChange={handleCPFInput}
                                error={isInvalidCpf}
                                helperText={isInvalidCpf ? "CPF inválido" : null}
                            />
                        </Slide>

                        <Slide direction="left" in={isRegister} mountOnEnter unmountOnExit>
                            <StyledTextField label="Nome"
                                variant="outlined"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Slide>

                        <StyledTextField label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={handleEmailInput}
                            error={isInvalidEmail}
                            helperText={isInvalidEmail ? "Email inválido" : null}
                        />

                        <StyledTextField label="Senha"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={handlePasswordInput}
                            error={passwordErrorMessage !== NO_ERROR}
                            helperText={passwordErrorMessage}
                        />

                        <Slide direction="left" in={isRegister} mountOnEnter unmountOnExit>
                            <StyledTextField label="Confirme a sua senha"
                                variant="outlined"
                                type="password"
                                value={passwordConfirmation}
                                onChange={handlePasswordConfirmationInput}
                                error={passwordConfirmationErrorMessage !== NO_ERROR}
                                helperText={passwordConfirmationErrorMessage}
                            />
                        </Slide>
                    </Stack>

                    <Button variant="contained"
                        className="submit-button"
                        onClick={handleLogin}
                    >{isRegister ? "Cadastrar" : "Entrar"}</Button>

                    <Divider className="login-divider">
                        <Chip label={isRegister ? "Já tem uma conta?" : "Ainda não tem uma conta?"}/>
                    </Divider>

                    <Button variant="outlined"
                        className="alternate-button"
                        onClick={() => setRegister(!isRegister)}
                    >{isRegister ? "Fazer login" : "Cadastrar"}</Button>
                </Stack>
            </Grid>

            {snackbarState &&
            <Snackbar open={snackbarState.open}
                message={snackbarState.message}
                level={snackbarState.level}
                onClose={handleSnackbarClose}
            />
            }
        </Grid>
}