import { View, Text } from "react-native";
import NextRaceCountdown from "../components/Calendar/NextRaceCountdown";
import CalendarDisplay from "../components/Calendar/CalendarDisplay";

export default function CalendarScreen(props: any) {
 
    return (
        <View>
            <NextRaceCountdown navigation={props.navigation} />
            <CalendarDisplay navigation={props.navigation} />
        </View>
    )
}