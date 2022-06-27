import React, {useEffect} from "react"
import Alert from "@mui/material/Alert"
import IconButton from "@mui/material/IconButton"
import MUISnackbar from "@mui/material/Snackbar"
import CloseIcon from "@mui/icons-material/Close"
import SnackbarLevel from "./SnackbarLevel"
import {truncate} from "../../util/StringUtils"

interface SnackbarProps {
    open: boolean
    message: string
    level: SnackbarLevel
    onClose: () => void
}

export default function Snackbar(props: SnackbarProps) {
    const [open, setOpen] = React.useState(props.open)

    useEffect(() => {
        setOpen(props.open)
        props.onClose()
    }, [props])

    return props.message ? <MUISnackbar open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}>
        <Alert
            severity={props.level}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setOpen(false)}
                >
                    <CloseIcon fontSize="inherit"/>
                </IconButton>
            }
            sx={{mb: 2}}
        >
            {truncate(props.message, 50)}
        </Alert>
    </MUISnackbar> : <></>
}
