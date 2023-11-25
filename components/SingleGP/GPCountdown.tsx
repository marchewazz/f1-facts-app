import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import RaceSchedule from "../../models/RaceSchedule.model";
import { useFocusEffect } from "@react-navigation/native";


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
        <View>
            <View>
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
        </View>
    )
}