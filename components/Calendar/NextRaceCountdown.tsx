import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import RaceSchedule from "../../models/RaceSchedule.model";
import dateToLocal from "../../util/dateToLocal";

export default function NextRaceCountdown() {

    const [raceSchedule, setRaceSchedule] = useState<RaceSchedule>();

    const [countdown, setCountdown] = useState<{
        days: number,
        hours: number,
        minutes: number,
    }>({
        days: 0,
        hours: 0,
        minutes: 0,
    })

    const [ready, setReady] = useState<boolean>(false)

    async function getRace() {
        try {
            setReady(false)
            const response = await fetch(`http://ergast.com/api/f1/current/next.json`)
            const json = await response.json();
            setRaceSchedule(json.MRData.RaceTable.Races[0] as RaceSchedule);
          } catch (error) {
            console.error(error);
          } finally {
            setReady(true);
          }
    }

    function countTime() {

        const structure: {
            days: number,
            hours: number,
            minutes: number,
            seconds: number
        } = {
            days: 86400,
            hours: 3600,
            minutes: 60,
            seconds: 1
        };

        let raceDate = dateToLocal(new Date(new Date(`${raceSchedule?.date}T${raceSchedule?.time}`).toUTCString()))
        
        let delta = Math.abs(raceDate.getTime() - new Date().getTime()) / 1000
        
        let res: {
            days: number,
            hours: number,
            minutes: number,
        } = {
            days: 0,
            hours: 0,
            minutes: 0,
        };
        
        for(let key in structure) {
            res[key as keyof typeof res] = Math.floor(delta / structure[key as keyof typeof res]);
            delta -= res[key as keyof typeof res] * structure[key as keyof typeof res];
        }

        setCountdown(res)

        setTimeout(() => {
            countTime()
        }, 60000);
    } 

    useEffect(() => {
        if (raceSchedule) countTime()
    }, [raceSchedule])
    

    useEffect(() => {
        getRace()
    }, [])    

    return (
        <View>
            { ready ? (
                <View>
                    <Text>
                        Next Grand Prix: { raceSchedule?.raceName }
                    </Text>
                    <View className="flex flex-row justify-between">
                        <Text>
                            { countdown.days }
                        </Text>
                        <Text>
                            { countdown.hours }
                        </Text>
                        <Text>
                            { countdown.minutes }
                        </Text>
                    </View>
                </View>
            ) : (
                <Text>
                    Loading...
                </Text>
            )}
        </View>
    )
}