import { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, Vibration } from "react-native";

import { Accelerometer } from 'expo-sensors';
import { useFocusEffect } from "@react-navigation/native";

export default function FactsScreen() {

    const facts: string[] = [
        "Fact 1",
        "Fact 2",
        "Fact 3"
    ]

    const [factIndex, setFactIndex] = useState<number>(0)

    function changeFact() {
        while (true) {
            const tempIndex = Math.floor(Math.random() * facts.length)
            if (tempIndex != factIndex) {
                setFactIndex(tempIndex)
                Vibration.vibrate(1000, false);
                break
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            Accelerometer.setUpdateInterval(1000)
            Accelerometer.addListener(({ x, y, z }) => {
                const acceleration = Math.sqrt(x * x + y * y + z * z);
            
                const sensibility = 1.8;
                if (acceleration >= sensibility) {
                  changeFact();
                }
            })
            
            return () => {
                Accelerometer.removeAllListeners() 
            }
        },[])
    )

    return (
        <View className="w-full h-full p-5 flex justify-center items-center bg-[#373837]">
            <Text className="text-4xl text-center text-white italic font-extrabold">{ facts[factIndex] }</Text>
        </View>
    )
}