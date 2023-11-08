import { useState, useEffect } from "react";
import { View, Text, Vibration } from "react-native";

import { Accelerometer } from 'expo-sensors';

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

    useEffect(() => {
        Accelerometer.setUpdateInterval(2000)
        const subscription = Accelerometer.addListener(({ x, y, z }) => {
            const acceleration = Math.sqrt(x * x + y * y + z * z);
           
            console.log(acceleration);
            
            const sensibility = 2;
            if (acceleration >= sensibility) {
              changeFact();
            }
        })
    }, [])

    return (
        <View>
            <Text>{ facts[factIndex] }</Text>
        </View>
    )
}