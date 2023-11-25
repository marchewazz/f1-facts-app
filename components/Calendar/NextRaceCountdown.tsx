import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Text } from "react-native";
import RaceSchedule from "../../models/RaceSchedule.model";
import { useFocusEffect } from "@react-navigation/native";


export default function NextRaceCountdown(props: { navigation: any }) {

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

    const intervalRef = useRef<any>(null);

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
        
        let raceDate = new Date(`${raceSchedule?.date}T${raceSchedule?.time}`)
        
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
    } 

    useEffect(() => {
        if (raceSchedule) {
            intervalRef.current = setInterval(() => {
                countTime()
            }, 60000);
        }
        
    }, [raceSchedule]) 

    useFocusEffect(
        useCallback(() => {
            setCountdown({
                days: 0,
                hours: 0,
                minutes: 0,
            })
            getRace()
            return () => {
                clearInterval(intervalRef.current) 
                intervalRef.current = null
            }
        },[])
    )

    return (
        <View>
            { ready ? (
                <View>
                    <Text 
                    onPress={() => props.navigation.navigate("SingleGPScreen", { schedule: raceSchedule })}>
                        Next Grand Prix:{" "}   
                        <Text className="underline">
                            { raceSchedule?.season } { raceSchedule?.raceName }
                        </Text>
                    </Text>
                    <View className="flex flex-row justify-between">
                        <Text>
                            In: 
                        </Text>
                        <Text>
                            Days: { countdown.days }
                        </Text>
                        <Text>
                            Hours: { countdown.hours }
                        </Text>
                        <Text>
                            Minutes: { countdown.minutes }
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