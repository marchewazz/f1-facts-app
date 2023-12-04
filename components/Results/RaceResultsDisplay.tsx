import { View, Text, ScrollView } from "react-native";
import RaceResultDriverDisplay from "./RaceResultDriverDisplay";
import RaceResults, { DriverResult } from "../../models/RaceResults.model";
import { DataTable } from 'react-native-paper';

export default function RaceResultsDisplay(props: { raceResults: RaceResults, season: string }) {    
    return (
        <View>
            <Text className="text-2xl text-center text-white font-bold mb-2">
                Race results
            </Text>
            <ScrollView horizontal={true}>
                <DataTable>
                    <DataTable.Header className="px-1 bg-white">
                        { props.season > "2003" ? (
                            <DataTable.Title style={{ width: 50 }} className="bg-white"><View></View></DataTable.Title>
                        ) : (null)}
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
                        { props.raceResults[0].points ? (
                            <DataTable.Title style={{ flex: 1, width: 80 }} className="bg-white">
                                <Text className="text-black text-lg">
                                    Points
                                </Text>
                            </DataTable.Title>
                        ) : (null)} 
                    </DataTable.Header>
                    { props.raceResults.map((result: DriverResult, index: number) => {
                    return (
                        <RaceResultDriverDisplay key={result.Driver.driverId} driver={result} index={index} season={props.season} />
                    )
                    })}
                </DataTable>             
            </ScrollView>
        </View>
    )
}