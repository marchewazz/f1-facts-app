import { View, Text, ScrollView } from "react-native";
import RaceResults, { DriverResult } from "../../models/RaceResults.model";
import SprintResultDriverDisplay from "./SprintResultDriverDisplay";
import { DataTable } from "react-native-paper";

export default function SprintResultsDisplay(props: { sprintResults: RaceResults }) {    
    return (
        <View>
            <Text className="text-2xl text-center text-white font-bold mb-2">
                Sprint results
            </Text>
            <ScrollView horizontal={true}>
                <DataTable>
                    <DataTable.Header className="px-1 bg-white">
                        <DataTable.Title style={{ flex: 1, width: 100 }} className="bg-white">
                            <Text className="text-black text-lg">
                                Position
                            </Text>
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 1, width: 100 }} className="bg-white" >
                            <Text className="text-black text-lg">
                                Grid
                            </Text>
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 1, width: 150 }} className="bg-white">
                            <Text className="text-black text-lg">
                                Name
                            </Text>
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 1, width: 150 }} className="bg-white">
                            <Text className="text-black text-lg">
                                Constructor
                            </Text>
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 1, width: 150 }} className="bg-white">
                            <Text className="text-black text-lg">
                                Time
                            </Text>
                        </DataTable.Title>
                        <DataTable.Title style={{ flex: 1, width: 80 }} className="bg-white">
                            <Text className="text-black text-lg">
                                Points
                            </Text>
                        </DataTable.Title>
                    </DataTable.Header>
                    { props.sprintResults.map((result: DriverResult, index: number) => {
                    return (
                        <SprintResultDriverDisplay key={result.Driver.driverId} driver={result} index={index} season={props.season} />
                    )
                    })}
                </DataTable>             
            </ScrollView>
        </View>
    )
}