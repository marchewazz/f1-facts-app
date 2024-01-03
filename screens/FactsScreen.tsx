import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { View, Text, Vibration, Dimensions, TouchableOpacity, ToastAndroid } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { Accelerometer } from 'expo-sensors';
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Image } from 'expo-image';
import { Audio } from 'expo-av';
import { useAssets } from "expo-asset/build/AssetHooks";
import AppContext from "../AppContext";

export default function FactsScreen() {

    const [imagesAssets, imagesError] = useAssets([
        require('../assets/Fernando_Alonso_2010_Australia.jpg'), 
        require('../assets/2011_Canadian_GP_Winner.jpg'), 
        require('../assets/Kimi_Raikkonen_Ferrari_F1_Team.jpg')
    ]);

    const facts: string[] = [
        "Fernando Alonso has won his first race with Ferrari in Australia 2010",
        "Jenson Button has a record of winning a race with the most pit stops - 6 in Canada 2011",
        "Kimi Räikkönen has a record of biggest gap between wins Australia 2013 - USA 2018",
    ]

    const [factIndex, setFactIndex] = useState<number>(0)

    const [buttonCooldown, setButtonCooldown] = useState<boolean>(false);

    const { audioOn, vibrationOn } = useContext(AppContext);

    async function changeFact() {
        while (true) {
            const tempIndex = Math.floor(Math.random() * facts.length)
            if (tempIndex != factIndex) {
                setButtonCooldown(true)
                setFactIndex(tempIndex)
                if (vibrationOn) Vibration.vibrate(1000, false);
                if (audioOn) (await Audio.Sound.createAsync(require('../assets/f1-sound.mp3'))).sound.playAsync()
                setTimeout(() => {
                    setButtonCooldown(false)
                }, 3000);
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
            <Text className="text-4xl text-center text-white italic font-extrabold px-2">{ facts[factIndex] }</Text>
            { imagesAssets ? (
                <Image className="w-full h-full absolute -z-50 opacity-30" source={imagesAssets[factIndex]} />
            ) : (null)}
            <View className="w-full absolute bottom-0 flex flex-row">
                <TouchableOpacity disabled={buttonCooldown} onPress={changeFact} className={`flex items-center justify-center py-3 bg-white w-1/2 ${buttonCooldown ? "opacity-50" : ""}`}>
                    <Text className="font-extrabold text-lg">
                        RANDOMIZE
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={async () =>  { await Clipboard.setStringAsync(facts[factIndex]); ToastAndroid.show("Copied!", ToastAndroid.LONG); }} className="flex items-center justify-center py-3 bg-white w-1/2">
                    <FontAwesomeIcon icon={faCopy} size={25} />
                </TouchableOpacity>
            </View>
          
        </View>
    )
}