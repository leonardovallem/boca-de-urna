import React from "react"
import {Stack, Typography} from "@mui/material"
import Candidate from "../../model/Candidate"
import "./style.css"
import {Vote} from "../../model/Vote"
import PartyNumber from "../PartyNumber"

interface CandidateOptionProps {
    candidate: Candidate
    onClick: (candidate: Candidate) => void
}

export default function CandidateOption(props: CandidateOptionProps) {
    return <Stack direction="row"
        className="candidate-card"
        onClick={() => props.onClick(props.candidate)}
    >
        {
            props.candidate.picture
                ? <img className="candidate-image" src={props.candidate.picture} />
                : <></>
        }

        <Stack justifyContent="space-between">
            <Typography variant="h4">{ props.candidate.name }</Typography>

            {
                props.candidate.party && <Stack direction="row"
                    alignItems="center"
                    spacing={3}
                >
                    <PartyNumber party={props.candidate.party} />
                    <Typography variant="h6">{ props.candidate.party.name }</Typography>
                    <img className="party-logo" src={props.candidate.party.picture!} />
                </Stack>
            }
        </Stack>
    </Stack>
}