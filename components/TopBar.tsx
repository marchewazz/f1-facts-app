import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AppContext from "../AppContext";

export default function TopBar() {

    const { audioOn, setAudioOn, vibrationOn, setVibrationOn } = useContext(AppContext);

    return (
        <View className="bg-black h-24 flex flex-row justify-between items-end pb-2 pl-3">
            <Text className="text-white text-3xl font-extrabold italic">
                <Text className="text-main-red">
                F1 {""}
                </Text>
                FACTS APP
            </Text>
            { audioOn != undefined && setAudioOn != undefined && vibrationOn != undefined && setVibrationOn != undefined ? (
                  <View className="flex flex-row gap-2">
                  <TouchableOpacity onPress={() => setAudioOn(!audioOn)}>
                      <Text className="font-extrabold text-white text-lg">
                          {
                              audioOn ? (
                                  "ON"
                              ) : (
                                  "OFF"
                              )
                          }
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setVibrationOn(!vibrationOn)}>
                      <Text className="font-extrabold text-white text-lg">
                          {
                              vibrationOn ? (
                                  "ON"
                              ) : (
                                  "OFF"
                              )
                          }
                      </Text>
                  </TouchableOpacity>
              </View>
            ) : (null)}
        </View>
    )
}