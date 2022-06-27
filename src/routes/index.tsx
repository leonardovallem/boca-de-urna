import React from "react"
import {BrowserRouter, Route, Routes as R} from "react-router-dom"
import VotingScreen from "../screens/VotingScreen"
import LoginPage from "../screens/LoginPage"

export default function Routes() {
    return <BrowserRouter>
        <R>
            <Route path="/" element={<VotingScreen/>}/>
            <Route path="/login" element={<LoginPage/>}/>
        </R>
    </BrowserRouter>
}