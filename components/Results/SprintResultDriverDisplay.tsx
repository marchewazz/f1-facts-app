import { View, Text } from "react-native";
import { DriverResult } from "../../models/RaceResults.model";
import getPositionText from "../../util/positionText";
import { DataTable } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function SprintResultDriverDisplay(props: { driver: DriverResult, index: number, season: string }) {
  
    return (
        <DataTable.Row className={`px-1 ${props.index % 2 == 1 ? "bg-white" : "bg-main-red"}`}>
            { props.season > "2003" ? (
                <DataTable.Cell style={{ width: 50, flex: 1, justifyContent: "center" }}>
                    { props.driver.FastestLap ? (
                        props.driver.FastestLap.rank === "1" ? (
                            <View className="bg-[#BC23D2] rounded p-1 w-7 h-7 flex items-center justify-center">
                                <FontAwesomeIcon icon={faClock} color="#FFF" size={20} />
                            </View>
                        ) : (null)
                    ):(null)}
                </DataTable.Cell>
            ) : (null)}
            <DataTable.Cell style={{ width: 100 }}>
                <Text className={`text-lg ${props.index % 2 == 1 ? "text-black" : "text-white"}`}>
                    { getPositionText(props.driver.positionText) }
                </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ width: 100 }}>
                <Text className={`text-lg ${props.index % 2 == 1 ? "text-black" : "text-white"}`}>
                    { props.driver.grid === "0" ? (
                        "Pit lane"
                    ) : (
                        props.driver.grid
                    )}
                </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ width: 150 }}>
                <Text className={`text-lg ${props.index % 2 == 1 ? "text-black" : "text-white"}`}>{ props.driver.Driver.givenName } { props.driver.Driver.familyName }</Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ width: 150 }}>
                <Text className={`text-lg ${props.index % 2 == 1 ? "text-black" : "text-white"}`}>
                    { props.driver.Constructor.name }
                </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ width: 150 }}>
                <Text className={`text-lg ${props.index % 2 == 1 ? "text-black" : "text-white"}`}>
                    { props.driver.Time ? (
                        props.driver.Time.time
                    ) : (props.driver.status)}
                </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ width: 80 }}>
                <Text className={`text-lg ${props.index % 2 == 1 ? "text-black" : "text-white"}`}>
                    +{ props.driver.points }
                </Text>
            </DataTable.Cell>
        </DataTable.Row>
    )
}