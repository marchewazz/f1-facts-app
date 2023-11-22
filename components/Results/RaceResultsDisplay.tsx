import { View, Text } from "react-native";
import RaceResultDriverDisplay from "./RaceResultDriverDisplay";
import RaceResults, { DriverResult } from "../../models/RaceResults.model";

export default function RaceResultsDisplay(props: { raceResults: RaceResults }) {    
    return (
        <View>
            <Text>
                Race results
            </Text>
            <View className="flex flex-row justify-between">
                <Text>
                    Fastest lap
                </Text>
                <Text>
                    Position
                </Text>
                <Text>
                    Name
                </Text>
                <Text>
                    Constructor
                </Text>
                <Text>
                    Time
                </Text>
            </View>
            { props.raceResults.map((result: DriverResult) => {
                return (
                    <RaceResultDriverDisplay key={result.Driver.driverId} driver={result} />
                )
            })}
        </View>
    )
}