import { View, Text } from "react-native";
import { DriverResult } from "../../models/RaceResults.model";

export default function RaceResultDriverDisplay(props: { driver: DriverResult }) {
  
    return (
        <View className="flex flex-row justify-between">
            <Text>
                { props.driver.FastestLap ? (
                    props.driver.FastestLap.rank === "1" ? (
                        "FF"
                    ) : (null)
                ):(null)}
            </Text>
            <Text>
                { props.driver.positionText }
            </Text>
            <Text>
                { props.driver.Driver.givenName } { props.driver.Driver.familyName }
            </Text>
            <Text>
                { props.driver.Constructor.name }
            </Text>
            <Text>
                { props.driver.Time ? (
                    props.driver.Time.time
                ) : (props.driver.status)}
            </Text>
           
        </View>
    )
}