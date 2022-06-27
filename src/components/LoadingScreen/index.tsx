import React from "react"
import {CircularProgress, Stack} from "@mui/material"

export default function LoadingScreen() {
    return <Stack width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
    >
        <CircularProgress />
    </Stack>
}