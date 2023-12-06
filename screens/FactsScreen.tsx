import { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, Vibration, Dimensions, TouchableOpacity, ToastAndroid } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { Accelerometer } from 'expo-sensors';
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

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
            Accelerometer.addListener(({ x, y, z }) => {
                const acceleration = Math.sqrt(x * x + y * y + z * z);
            
                const sensibility = 1.8;
                if (acceleration >= sensibility) {
                    Accelerometer.setUpdateInterval(3000)
                    changeFact();
                }
            })
            
            return () => {
                Accelerometer.setUpdateInterval(0)
                Accelerometer.removeAllListeners() 
            }
        },[])
    )

    return (
        <View className="w-full h-full flex justify-center items-center bg-main-background relative" style={{ height: Dimensions.get("window").height - 119 }}>
            <Text className="text-4xl text-center text-white italic font-extrabold">{ facts[factIndex] }</Text>
            <TouchableOpacity onPress={async () =>  { await Clipboard.setStringAsync(facts[factIndex]); ToastAndroid.show("Copied!", ToastAndroid.LONG); }} className="flex items-center justify-center absolute py-3 bottom-0 bg-white w-full">
                <FontAwesomeIcon icon={faCopy} size={25} />
            </TouchableOpacity>
        </View>
    )
}