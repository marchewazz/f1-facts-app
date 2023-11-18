import { View, Text } from "react-native";
import { useIsFocused } from "@react-navigation/native"; 
import RaceSchedule from "../models/RaceSchedule.model";
import { useEffect, useState } from "react";
import { getDate, getTime } from "../util/dateFunctions";

export default function SingleGPScreen(props: any) {    

    const [schedule, setSchedule] = useState<RaceSchedule>()
    const focus = useIsFocused();  
    console.log(props.route.params.schedule);
    
    const [ready, setReady] = useState<boolean>(false)

    useEffect(() => {
        if (focus == true) {
            setReady(false)
            setSchedule(props.route.params.schedule)
        }
    }, [focus])
    

    useEffect(() => {
        if (schedule) {
            if (schedule.FirstPractice) schedule.FirstPractice.localTime = new Date(`${schedule.FirstPractice?.date}T${schedule.FirstPractice?.time ?? "0:00:00"}`)
            if (schedule.SecondPractice) schedule.SecondPractice.localTime = new Date(`${schedule.SecondPractice?.date}T${schedule.SecondPractice?.time ?? "0:00:00"}`)
            if (schedule.ThirdPractice) schedule.ThirdPractice.localTime = new Date(`${schedule.ThirdPractice?.date}T${schedule.ThirdPractice?.time ?? "0:00:00"}`)
            if (schedule.Qualifying) schedule.Qualifying.localTime = new Date(`${schedule.Qualifying?.date}T${schedule.Qualifying?.time ?? "0:00:00"}`)
            if (schedule.Sprint) schedule.Sprint.localTime = new Date(`${schedule.Sprint?.date}T${schedule.Sprint?.time ?? "0:00:00"}`)
            console.log(`fdsfs`);

            if (schedule.date) schedule.localTime = new Date(`${schedule.date}T${schedule.time ?? "0:00:00"}`)

            setReady(true)
        }
    }, [schedule])
    

    return (
        <View>
            { ready && schedule ? (
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
                                <Text>
                                    {`Sprint: ${getDate(schedule.Sprint.localTime)} ${schedule.Sprint.time ? getTime(schedule.Sprint.localTime) : ""}`}
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
                                <Text>
                                    {`Sprint: ${getDate(schedule.Sprint.localTime)} ${schedule.Sprint.time ? getTime(schedule.Sprint.localTime) : ""}`}
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
                    <Text>
                        {`Race: ${getDate(schedule.localTime)} ${schedule.time ? getTime(schedule.localTime) : ""}`}
                    </Text>
                </>
            ) : (
                <Text>
                    Loading...
                </Text>
            )}
        </View>
    )
}