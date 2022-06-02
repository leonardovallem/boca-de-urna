import React from "react"
import Party from "../../model/Party"
import "./style.css"
import fontColorContrast from "font-color-contrast"

interface PartyNumberProps {
    party: Party
}

export default function PartyNumber(props: PartyNumberProps) {
    return <div className="party-number" style={{
        backgroundColor: props.party.primaryColor,
        color: fontColorContrast(props.party.primaryColor)
    }}>
        {props.party.number}
    </div>
}