import React, {useState} from "react"
import {BottomNavigation, BottomNavigationAction, Button, Grid, Stack, Typography} from "@mui/material"
import HowToVoteIcon from "@mui/icons-material/HowToVote"
import PieChartIcon from "@mui/icons-material/PieChart"
import BarChartIcon from "@mui/icons-material/Leaderboard"
import {ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip} from "chart.js"
import {Bar, Pie} from "react-chartjs-2"
import TopAppBar from "../../components/TopAppBar"
import "./style.css"
import Candidate, {Bolsonaro, Ciro, Lula, Nenhum, Nulo, Outro, SimoneTebet} from "../../model/Candidate"
import CandidateSelector from "../../components/CandidateSelector"

export default function VotingScreen() {
    enum ChartType { Bar, Pie }

    const [candidate, setCandidate] = useState<Candidate>(Nenhum)
    const [isVoting, setVoting] = useState(false)
    const [selectedChart, setSelectedChart] = useState(ChartType.Pie)

    const hasVoted = () => candidate !== null

    const getVoteState = () => hasVoted() ? "Editar" : "Votar"

    function handleVote(candidate: Candidate) {
        setCandidate(candidate)
        setVoting(false)
    }

    Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Tooltip,
        Legend,
        ArcElement
    )

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: selectedChart === ChartType.Pie,
                position: "bottom" as const,
                labels: {
                    color: "white"
                }
            },
        },
        scales: {
            xAxis: selectedChart === ChartType.Pie ? {display: false} : {ticks: {color: "white"}},
            yAxis: selectedChart === ChartType.Pie ? {display: false} : {ticks: {color: "white"}},
        }
    }

    const data = {
        labels: ["Lula", "Bolsonaro", "Ciro", "Simone Tebet", "Outro", "Nulo"],
        datasets: [
            {
                label: "Candidato",
                data: [51, 27, 7, 2, 4, 8],
                backgroundColor: [
                    Lula.party!.primaryColor,
                    Bolsonaro.party!.primaryColor,
                    Ciro.party!.primaryColor,
                    SimoneTebet.party!.primaryColor,
                    "white",
                    "#A0A0A0"
                ],
                borderColor: [
                    Lula.party!.secondaryColor,
                    Bolsonaro.party!.secondaryColor,
                    Ciro.party!.secondaryColor,
                    SimoneTebet.party!.secondaryColor,
                    "white",
                    "#A0A0A0"
                ],
            },
        ]
    }

    return <Stack height="100vh">
        <TopAppBar/>
        <Grid container flexGrow={1} className="home-container">
            <Grid item xs={isVoting ? 12 : 6} className="vote-panel-wrapper">
                <Stack className="vote-panel" spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h4">
                            {isVoting ? "Selecione sua intenção de voto" : "Seu voto"}
                        </Typography>

                        {
                            isVoting || <Button variant="contained"
                                className="edit-vote-button"
                                onClick={() => setVoting(true)}
                            >
                                {getVoteState()}
                            </Button>
                        }
                    </Stack>

                    {
                        isVoting ? <CandidateSelector onChange={handleVote}/>
                            : <>
                                <Typography variant="h3">{candidate.name}</Typography>

                                {candidate.isValid() && <img className="voted-candidate-image" src={candidate.picture ?? ""}/>}
                                {
                                    hasVoted() || <Stack spacing={3} justifyContent="center" alignItems="center" flex={1}>
                                        <HowToVoteIcon className="home-icon"/>
                                        <Typography variant="subtitle1">Parece que você ainda não votou...</Typography>
                                    </Stack>
                                }
                            </>
                    }
                </Stack>
            </Grid>
            {
                isVoting || <Grid item xs={6}>
                    <Stack className="side-panel">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h4">Resultados parciais</Typography>

                            <BottomNavigation
                                className="chart-selector"
                                value={selectedChart}
                                onChange={(e, value) => setSelectedChart(value)}
                            >
                                <BottomNavigationAction className="chart-icon" value={ChartType.Pie}
                                    icon={<PieChartIcon/>}
                                />
                                <BottomNavigationAction className="chart-icon" value={ChartType.Bar}
                                    icon={<BarChartIcon/>}
                                />
                            </BottomNavigation>
                        </Stack>

                        {selectedChart === ChartType.Pie
                            ? <Pie className="chart" options={options} data={data}/>
                            : <Bar className="chart" options={options} data={data}/>
                        }
                    </Stack>
                </Grid>
            }
        </Grid>
    </Stack>
}