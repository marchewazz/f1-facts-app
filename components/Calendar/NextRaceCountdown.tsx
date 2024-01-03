import React, { useEffect, useRef, useState, useCallback } from "react";
import { View, Text } from "react-native";
import RaceSchedule from "../../models/RaceSchedule.model";
import { useFocusEffect } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import LoadingComponent from "../LoadingComponent";


export default function NextRaceCountdown(this: any, props: { navigation: any }) {

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
          
            if (json.MRData.total != "0") setRaceSchedule(json.MRData.RaceTable.Races[0] as RaceSchedule);
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
        
        let raceDate = new Date(`${raceSchedule?.date}T${raceSchedule?.time || "0:00:00"}`)
        
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
            countTime()
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
                <>
                    { raceSchedule ? (
                    <View className="p-2 bg-main-red">
                        <Text className="font-bold text-xl"
                        onPress={() => props.navigation.navigate("SingleGPScreen", { schedule: raceSchedule })}>
                            Next Grand Prix:{" "}   
                            <Text className="underline text-white font-normal">
                                { raceSchedule?.season } { raceSchedule?.raceName }
                            </Text>
                        </Text>
                        <View className="flex flex-row justify-between mt-3">
                            <AnimatedCircularProgress
                                size={100}
                                width={10}
                                fill={countdown.days / 30 * 100}
                                tintColor="#FFF"
                                backgroundColor="#000"
                                duration={800}
                                rotation={0}>
                                    {
                                        () => (
                                            <View className="flex items-center">
                                                <Text className="text-white text-lg font-bold">
                                                    { countdown.days }
                                                </Text>
                                                <Text className="text-white">
                                                    Days
                                                </Text>
                                            </View>
                                        )
                                    }
                            </AnimatedCircularProgress>
                            <AnimatedCircularProgress
                                size={100}
                                width={10}
                                fill={countdown.hours / 24 * 100}
                                tintColor="#FFF"
                                backgroundColor="#000"
                                duration={800}
                                rotation={0}>
                                    {
                                        () => (
                                            <View className="flex items-center">
                                                <Text className="text-white text-lg font-bold">
                                                    { countdown.hours }
                                                </Text>
                                                <Text className="text-white">
                                                    Hours
                                                </Text>
                                            </View>
                                        )
                                    }
                            </AnimatedCircularProgress>
                            <AnimatedCircularProgress
                                size={100}
                                width={10}
                                fill={countdown.minutes / 60 * 100}
                                tintColor="#FFF"
                                backgroundColor="#000"
                                duration={800}
                                rotation={0}>
                                    {
                                        () => (
                                            <View className="flex items-center">
                                                <Text className="text-white text-lg font-bold">
                                                    { countdown.minutes }
                                                </Text>
                                                <Text className="text-white">
                                                    Minutes
                                                </Text>
                                            </View>
                                        )
                                    }
                            </AnimatedCircularProgress>
                        </View>
                    </View>
                ) : (null)}
                </>
            ) : (
                <LoadingComponent />
            )}
        </View>
    )
}