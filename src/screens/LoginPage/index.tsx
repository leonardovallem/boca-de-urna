import React, {useEffect, useState} from "react"
import {Button, Chip, Divider, Grid, Slide, Stack, styled, TextField, Typography} from "@mui/material"
import {cpfMask, validateCPF} from "../../util/CPFUtil"
import UrnaImage from "./urna.jpeg"
import {EMAIL_REGEX} from "../../util/Regex"
import "./style.css"

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
    const [imageWidth, setImageWidth] = useState(500)
    const [isRegister, setRegister] = useState(false)

    const [email, setEmail] = useState("")
    const [isInvalidEmail, setInvalidEmail] = useState(false)

    const [cpf, setCpf] = useState("")
    const [isInvalidCpf, setInvalidCpf] = useState(false)

    function handleResize() {
        const loginInfo = document.getElementById("login-info")
        if (!loginInfo) return
        setImageWidth(loginInfo.clientWidth * 0.75)
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    function handleCPFInput(e: React.ChangeEvent<HTMLInputElement>) {
        setCpf(cpfMask(e.target.value))
        setInvalidCpf(!validateCPF(e.target.value))
    }

    function handleEmailInput(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
        setInvalidEmail(!EMAIL_REGEX.test(e.target.value))
    }

    return <Grid container className="login-body">
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
                    />

                    <Slide direction="left" in={isRegister} mountOnEnter unmountOnExit>
                        <StyledTextField label="Confirme a sua senha"
                            variant="outlined"
                            type="password"
                        />
                    </Slide>
                </Stack>

                <Button variant="contained"
                    className="submit-button"
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
    </Grid>
}