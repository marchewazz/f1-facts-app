import { View, Text } from "react-native";
import RaceResultDriverDisplay from "./RaceResultDriverDisplay";
import RaceResults, { DriverResult } from "../../models/RaceResults.model";

export default function RaceResultsDisplay(props: { raceResults: RaceResults, season: string }) {    
    return (
        <View>
            <Text>
                Race results
            </Text>
            <View className="flex flex-row justify-between">
                { props.season > "2003" ? (
                    <Text>
                        Fastest lap
                    </Text>
                ) : (null)}
                <Text>
                    Position
                </Text>
                <Text>
                    Grid
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
                { props.raceResults[0].points ? (
                    <Text>
                        Points
                    </Text>
                ) : (null)} 
            </View>
            { props.raceResults.map((result: DriverResult) => {
                return (
                    <RaceResultDriverDisplay key={result.Driver.driverId} driver={result} />
                )
            })}
        </View>
    )
}