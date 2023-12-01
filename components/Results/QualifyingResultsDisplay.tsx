import { View, Text, TouchableOpacity } from "react-native";
import QualifyingResults, { DriverQualifyingResult } from "../../models/QualifyingResults.model";
import { useEffect, useState } from "react";

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
            <Text className="text-2xl text-center text-white font-bold">
                Qualifying results
            </Text>
            <View className="flex flex-row justify-between">
                { props.qualifyingResults[0].Q1 ? (
                    <TouchableOpacity
                    key="Q1"
                    className={`flex h-full w-1/3 items-center pb-1 border-b ${qualifyingPart === "Q1" ? "border-main-red" : "border-white"}`}
                    accessibilityRole="button"
                    onPress={() => setQualifyingPart("Q1")}>
                    <Text className={`${qualifyingPart === "Q1" ? "text-main-red" : "text-white"}`}>
                        Q1
                    </Text>
                </TouchableOpacity>
                ) : (null)}
                { props.qualifyingResults[0].Q2 ? (
                    <TouchableOpacity
                    key="Q2"
                    className={`flex h-full w-1/3 items-center pb-1 border-b ${qualifyingPart === "Q2" ? "border-main-red" : "border-white"}`}
                    accessibilityRole="button"
                    onPress={() => setQualifyingPart("Q2")}>
                    <Text className={`${qualifyingPart === "Q2" ? "text-main-red" : "text-white"}`}>
                        Q2
                    </Text>
                </TouchableOpacity>
                ) : (null)}
                { props.qualifyingResults[0].Q3 ? (
                    <TouchableOpacity
                    key="Q3"
                    className={`flex h-full w-1/3 items-center pb-1 border-b ${qualifyingPart === "Q3" ? "border-main-red" : "border-white"}`}
                    accessibilityRole="button"
                    onPress={() => setQualifyingPart("Q3")}>
                    <Text className={`${qualifyingPart === "Q3" ? "text-main-red" : "text-white"}`}>
                        Q3
                    </Text>
                </TouchableOpacity>
                ) : (null)}
            </View>
            <View>
                { props.qualifyingResults
                .filter((driver: DriverQualifyingResult) => qualifyingPart in driver)
                .sort((driver1: DriverQualifyingResult, driver2: DriverQualifyingResult) => { return (driver1[qualifyingPart] || "999:99:999") > (driver2[qualifyingPart] || "999:99:999") ? 1 : -1 })
                .map((driver: DriverQualifyingResult, index: number) => {
                    return (
                        <View className="flex flex-row justify-between">
                            <Text>
                                { index + 1 }
                            </Text>
                            <Text>
                                { driver.Driver.givenName } { driver.Driver.familyName }
                            </Text>
                            <Text>
                                { driver.Constructor.name }
                            </Text>
                            <Text>
                                { driver[qualifyingPart] || "No time" }
                            </Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}