import { View, Text } from "react-native";
import NextRaceCountdown from "../components/Calendar/NextRaceCountdown";
import CalendarDisplay from "../components/Calendar/CalendarDisplay";
import { Dimensions } from 'react-native';

export default function CalendarScreen(props: any) {
    return (
        <View className="bg-main-background" style={{ height: Dimensions.get("window").height - 119 }}>
            <NextRaceCountdown navigation={props.navigation} />
            <CalendarDisplay navigation={props.navigation} />
        </View>
    )
}