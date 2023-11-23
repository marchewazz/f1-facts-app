import { View, Text } from "react-native";
import { DriverResult } from "../../models/RaceResults.model";
import getPositionText from "../../util/positionText";

export default function SprintResultDriverDisplay(props: { driver: DriverResult }) {
  
    return (
        <View className="flex flex-row justify-between">
            <Text>
                { getPositionText(props.driver.positionText) }
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