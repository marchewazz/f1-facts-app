import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import QualifyingResults, { DriverQualifyingResult } from "../../models/QualifyingResults.model";
import { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";

export default function QualifyingResultsDisplay(props: { qualifyingResults: DriverQualifyingResult[] }) {

    const [qualifyingPart, setQualifyingPart] = useState<"Q1" | "Q2" | "Q3">("Q1");
    
    useEffect(() => {
        let tempPart: "Q1" | "Q2" | "Q3" = "Q1";
        if (props.qualifyingResults[0].Q1) tempPart = "Q1"
        if (props.qualifyingResults[0].Q2) tempPart = "Q2" 
        if (props.qualifyingResults[0].Q3) tempPart = "Q3"
        setQualifyingPart(tempPart)
    }, [])

    return (
        <View>
            <Text className="text-2xl text-center text-white font-bold mb-2">
                Qualifying results
            </Text>
            <View className="flex flex-row justify-between">
                { props.qualifyingResults[0].Q1 ? (
                    <TouchableOpacity
                    key="Q1"
                    className={`flex h-full w-1/3 items-center pb-1 border-b`}
                    accessibilityRole="button"
                    onPress={() => setQualifyingPart("Q1")}>
                    <Text className={`${qualifyingPart === "Q1" ? "text-main-red" : "text-white"} text-xl font-bold`}>
                        Q1
                    </Text>
                </TouchableOpacity>
                ) : (null)}
                { props.qualifyingResults[0].Q2 ? (
                    <TouchableOpacity
                    key="Q2"
                    className={`flex h-full w-1/3 items-center pb-1 border-b`}
                    accessibilityRole="button"
                    onPress={() => setQualifyingPart("Q2")}>
                    <Text className={`${qualifyingPart === "Q2" ? "text-main-red" : "text-white"} text-xl font-bold`}>
                        Q2
                    </Text>
                </TouchableOpacity>
                ) : (null)}
                { props.qualifyingResults[0].Q3 ? (
                    <TouchableOpacity
                    key="Q3"
                    className={`flex h-full w-1/3 items-center pb-1 border-b`}
                    accessibilityRole="button"
                    onPress={() => setQualifyingPart("Q3")}>
                    <Text className={`${qualifyingPart === "Q3" ? "text-main-red" : "text-white"} text-xl font-bold`}>
                        Q3
                    </Text>
                </TouchableOpacity>
                ) : (null)}
            </View>
            <ScrollView horizontal={true}>
                <DataTable>
                    <DataTable.Header className="px-1 bg-white">
                        <DataTable.Title style={{ flex: 1, width: 100 }} className="bg-white">
                            <Text className="text-black text-lg">
                                Position
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
                    </DataTable.Header>
                    { props.qualifyingResults
                .filter((driver: DriverQualifyingResult) => qualifyingPart in driver)
                .sort((driver1: DriverQualifyingResult, driver2: DriverQualifyingResult) => { return (driver1[qualifyingPart] || "999:99:999") > (driver2[qualifyingPart] || "999:99:999") ? 1 : -1 })
                .map((driver: DriverQualifyingResult, index: number) => {
                    return (
                        <DataTable.Row key={driver.Driver.driverId} className={`px-1 ${index % 2 == 1 ? "bg-white" : "bg-main-red"}`}>
                            <DataTable.Cell style={{ width: 100 }}>
                                <Text className={`text-lg ${index % 2 == 1 ? "text-black" : "text-white"}`}>
                                    { index + 1 }
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ width: 150 }}>
                                <Text className={`text-lg ${index % 2 == 1 ? "text-black" : "text-white"}`}>
                                    { driver.Driver.givenName } { driver.Driver.familyName }
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ width: 150 }}>
                                <Text className={`text-lg ${index % 2 == 1 ? "text-black" : "text-white"}`}>
                                    { driver.Constructor.name }
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ width: 150 }}>
                                <Text className={`text-lg ${index % 2 == 1 ? "text-black" : "text-white"}`}>
                                    { driver[qualifyingPart] || "No time" }
                                </Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    )
                })}
                </DataTable>             
            </ScrollView>
            <View>
                
            </View>
        </View>
    )
}