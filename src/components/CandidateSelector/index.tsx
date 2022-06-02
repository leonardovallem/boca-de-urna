import React from "react"
import {Stack} from "@mui/material"
import Candidate, {Bolsonaro, Ciro, Lula, Nulo, Outro, SimoneTebet} from "../../model/Candidate"
import CandidateOption from "../CandidateOption"

const candidates = [Lula, Bolsonaro, Ciro, SimoneTebet, Outro, Nulo]

interface CandidateSelectorProps {
    onChange: (candidate: Candidate) => void
}

export default function CandidateSelector(props: CandidateSelectorProps) {
    return <Stack>
        {
            candidates.map(candidate => {
                return <CandidateOption
                    key={candidate.name}
                    candidate={candidate}
                    onClick={() => props.onChange(candidate)}/>
            })
        }
    </Stack>
}