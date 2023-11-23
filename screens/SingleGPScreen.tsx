import { View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native"; 
import RaceSchedule from "../models/RaceSchedule.model";
import { useEffect, useState } from "react";
import { getDate, getTime } from "../util/dateFunctions";
import RaceResults from "../models/RaceResults.model";
import RaceResultsDisplay from "../components/Results/RaceResultsDisplay";
import SprintResultsDisplay from "../components/Results/SprintResultsDisplay";

export default function SingleGPScreen(props: any) {    

    const [schedule, setSchedule] = useState<RaceSchedule>()
    const [raceResults, setRaceResults] = useState<RaceResults>()
    const [sprintResults, setSprintResults] = useState<RaceResults>()
    const [tab, setTab] = useState<string>("race")

    const focus = useIsFocused();  
    
    const [ready, setReady] = useState<boolean>(false)

    async function fetchRaceResults() {
        try {            
            const response = await fetch(`http://ergast.com/api/f1/${props.route.params.schedule.season}/${props.route.params.schedule.round}/results.json`)
            const json = await response.json();
        
            setRaceResults(json.MRData.RaceTable.Races[0].Results as RaceResults);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchSprintResults() {
        try {            
            const response = await fetch(`http://ergast.com/api/f1/${props.route.params.schedule.season}/${props.route.params.schedule.round}/sprint.json`)
            const json = await response.json();
        
            setSprintResults(json.MRData.RaceTable.Races[0].SprintResults as RaceResults);
        } catch (error) {
            console.error(error);
        }
    }
    
    async function fetchData() {
        if (new Date(`${props.route.params.schedule.date}T${props.route.params.schedule.time ?? "0:00:00"}`).getTime() < new Date().getTime()) await fetchRaceResults()
        if (schedule?.Sprint && new Date(`${props.route.params.schedule.Sprint?.date}T${props.route.params.schedule.Sprint?.time ?? "0:00:00"}`).getTime() < new Date().getTime()) {
            await fetchSprintResults()
        }
        setReady(true)
    }

    
    useEffect(() => {
        if (focus == true) {
            setReady(false)
            setSchedule(props.route.params.schedule)
            fetchData()
        }
    }, [focus])

    useEffect(() => {
        console.log(schedule);
        
        if (schedule) {
            console.log(schedule);
            
            if (schedule.FirstPractice) schedule.FirstPractice.localTime = new Date(`${schedule.FirstPractice?.date}T${schedule.FirstPractice?.time ?? "0:00:00"}`)
            if (schedule.SecondPractice) schedule.SecondPractice.localTime = new Date(`${schedule.SecondPractice?.date}T${schedule.SecondPractice?.time ?? "0:00:00"}`)
            if (schedule.ThirdPractice) schedule.ThirdPractice.localTime = new Date(`${schedule.ThirdPractice?.date}T${schedule.ThirdPractice?.time ?? "0:00:00"}`)
            if (schedule.Qualifying) schedule.Qualifying.localTime = new Date(`${schedule.Qualifying?.date}T${schedule.Qualifying?.time ?? "0:00:00"}`)
            if (schedule.Sprint) schedule.Sprint.localTime = new Date(`${schedule.Sprint?.date}T${schedule.Sprint?.time ?? "0:00:00"}`)
            if (schedule.date) schedule.localTime = new Date(`${schedule.date}T${schedule.time ?? "0:00:00"}`)    
        }
    }, [schedule])
    

    return (
        <View>
            { ready && schedule?.localTime ? (
                <>
                    <Text>{`${schedule.season} ${schedule.raceName}` }</Text>
                    { schedule.Sprint  ? (
                    <>
                    { schedule.season === "2023" ? (
                        <>
                            { schedule.FirstPractice ? (
                                <Text>
                                    {`First practice: ${getDate(schedule.FirstPractice.localTime)} ${schedule.FirstPractice.time ? getTime(schedule.FirstPractice.localTime) : ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.Qualifying ? (
                                <Text>
                                    {`Qualifying: ${getDate(schedule.Qualifying.localTime)} ${schedule.Qualifying.time ? getTime(schedule.Qualifying.localTime) : ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.SecondPractice ? (
                                <Text>
                                    {`Sprint qualifying: ${getDate(schedule.SecondPractice.localTime)} ${schedule.SecondPractice.time ? getTime(schedule.SecondPractice.localTime) : ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.Sprint ? (
                                <Text onPress={() => { if(sprintResults) setTab("sprint")}}>
                                    <Text className={`${sprintResults ? "underline" : ""}`}>
                                        Sprint
                                    </Text>
                                    {`: ${getDate(schedule.Sprint.localTime)} ${schedule.Sprint.time ? getTime(schedule.Sprint.localTime) : ""}`}
                                </Text>
                            ) : (null)}
                        </>
                    ) : (
                        <>
                            { schedule.FirstPractice ? (
                                <Text>
                                    {`First practice: ${getDate(schedule.FirstPractice.localTime)} ${schedule.FirstPractice.time ? getTime(schedule.FirstPractice.localTime) : ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.Qualifying ? (
                                <Text>
                                    {`Qualifying: ${getDate(schedule.Qualifying.localTime)} ${schedule.Qualifying.time ? getTime(schedule.Qualifying.localTime) : ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.SecondPractice ? (
                                <Text>
                                    {`Second pracitce: ${getDate(schedule.SecondPractice.localTime)} ${schedule.SecondPractice.time ? getTime(schedule.SecondPractice.localTime) : ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.Sprint ? (
                                <Text onPress={() => { if(sprintResults) setTab("sprint")}}>
                                    <Text className={`${sprintResults ? "underline" : ""}`}>
                                        Sprint
                                    </Text>
                                    {`: ${getDate(schedule.Sprint.localTime)} ${schedule.Sprint.time ? getTime(schedule.Sprint.localTime) : ""}`}
                                </Text>
                            ) : (null)}
                        </>
                    )}
                </>
            ) : (
                <>
                    { schedule.FirstPractice ? (
                        <Text>
                            {`First practice: ${getDate(schedule.FirstPractice.localTime)} ${schedule.FirstPractice.time ? getTime(schedule.FirstPractice.localTime) : ""}`}
                        </Text>
                    ) : (null)}
                    { schedule.SecondPractice ? (
                        <Text>
                            {`Second pracitce: ${getDate(schedule.SecondPractice.localTime)} ${schedule.SecondPractice.time ? getTime(schedule.SecondPractice.localTime) : ""}`}
                        </Text>
                    ) : (null)}
                    { schedule.ThirdPractice ? (
                        <Text>
                            {`Thrid practice: ${getDate(schedule.ThirdPractice.localTime)} ${schedule.ThirdPractice.time ? getTime(schedule.ThirdPractice.localTime) : ""}`}
                        </Text>
                    ) : (null)}
                    { schedule.Qualifying ? (
                        <Text>
                            {`Qualifying: ${getDate(schedule.Qualifying.localTime)} ${schedule.Qualifying.time ? getTime(schedule.Qualifying.localTime) : ""}`}
                        </Text>
                    ) : (null)}
                </>
                    )}
                    <Text onPress={() => { if(raceResults) setTab("race")}}>
                        <Text className={`${raceResults ? "underline" : ""}`}>
                            Race
                        </Text>
                        {`: ${getDate(schedule.localTime)} ${schedule.time ? getTime(schedule.localTime) : ""}`}
                    </Text>
                    <View>
                        { raceResults || sprintResults ? (
                            <>
                                { tab == "race" && raceResults ? (
                                    <RaceResultsDisplay raceResults={raceResults} />
                                ) : (null)}
                                { tab == "sprint" && sprintResults ? (
                                    <SprintResultsDisplay sprintResults={sprintResults} />
                                ) : (null)}
                            </>
                        ) : (
                            <>
                                <Text>
                                    Race soon
                                </Text>
                            </>
                        )}
                        
                    </View>
                </>
            ) : (
                <Text>
                    Loading...
                </Text>
            )}
        </View>
    )
}