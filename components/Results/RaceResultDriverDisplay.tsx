import { View, Text } from "react-native";
import { DriverResult } from "../../models/RaceResults.model";
import getPositionText from "../../util/positionText";

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
                { getPositionText(props.driver.positionText) }
            </Text>
            <Text>
                { props.driver.grid === "0" ? (
                    "Pit lane"
                ) : (
                    props.driver.grid
                )}
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
            <Text>
                +{ props.driver.points }
            </Text>
        </View>
    )
}