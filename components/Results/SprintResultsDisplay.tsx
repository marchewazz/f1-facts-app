import { View, Text } from "react-native";
import RaceResults, { DriverResult } from "../../models/RaceResults.model";
import SprintResultDriverDisplay from "./SprintResultDriverDisplay";

export default function SprintResultsDisplay(props: { sprintResults: RaceResults }) {    
    return (
        <View>
            <Text>
                Sprint results
            </Text>
            <View className="flex flex-row justify-between">
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
            { props.sprintResults.map((result: DriverResult) => {
                return (
                    <SprintResultDriverDisplay key={result.Driver.driverId} driver={result} />
                )
            })}
        </View>
    )
}