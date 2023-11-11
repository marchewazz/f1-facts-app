import { View, Text } from "react-native";
import NextRaceCountdown from "../components/Calendar/NextRaceCountdown";
import CalendarDisplay from "../components/Calendar/CalendarDisplay";

export default function CalendarScreen() {
    return (
        <View>
            <NextRaceCountdown />
            <CalendarDisplay />
        </View>
    )
}