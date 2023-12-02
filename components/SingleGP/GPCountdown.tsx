import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import RaceSchedule from "../../models/RaceSchedule.model";
import { useFocusEffect } from "@react-navigation/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";


export default function GPCountdown(props: { raceDate: Date }) {

    const [countdown, setCountdown] = useState<{
        days: number,
        hours: number,
        minutes: number,
    }>({
        days: 0,
        hours: 0,
        minutes: 0,
    })

    const intervalRef = useRef<any>(null);

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
     
        let delta = Math.abs(props.raceDate.getTime() - new Date().getTime()) / 1000
        
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
        if (props.raceDate) {
            intervalRef.current = setInterval(() => {
                countTime()
            }, 1000);
        }
        
    }, [props.raceDate]) 

    useFocusEffect(
        useCallback(() => {
            setCountdown({
                days: 0,
                hours: 0,
                minutes: 0,
            })
            return () => {
                clearInterval(intervalRef.current) 
                intervalRef.current = null
            }
        },[])
    )

    return (
        <View className="flex flex-row justify-between p-2 my-2 bg-main-red">
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
    )
}