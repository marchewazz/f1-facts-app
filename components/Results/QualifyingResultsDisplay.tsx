import { View, Text, TouchableOpacity } from "react-native";
import QualifyingResults, { DriverQualifyingResult } from "../../models/QualifyingResults.model";
import { useEffect, useState } from "react";

export default function QualifyingResultsDisplay(props: { qualifyingResults: DriverQualifyingResult[] }) {

    const [qualifyingPart, setQualifyingPart] = useState<"Q1" | "Q2" | "Q3">("Q1");

    useEffect(() => {
        if (props.qualifyingResults[0].Q1) setQualifyingPart("Q1") 
        if (props.qualifyingResults[0].Q2) setQualifyingPart("Q2") 
        if (props.qualifyingResults[0].Q3) setQualifyingPart("Q3") 
    }, [])
    

    return (
        <View>
            <View className="flex flex-row justify-between">
                { props.qualifyingResults[0].Q1 ? (
                    <TouchableOpacity
                    key="Q1"
                    className={`flex h-full w-1/3 items-center ${qualifyingPart === "Q1" ? "bg-red-700" : "bg-white"}`}
                    accessibilityRole="button"
                    onPress={() => setQualifyingPart("Q1")}>
                    <Text>
                        Q1
                    </Text>
                </TouchableOpacity>
                ) : (null)}
                { props.qualifyingResults[0].Q2 ? (
                    <TouchableOpacity
                    key="Q2"
                    className={`flex h-full w-1/3 items-center ${qualifyingPart === "Q2" ? "bg-red-700" : "bg-white"}`}
                    accessibilityRole="button"
                    onPress={() => setQualifyingPart("Q2")}>
                    <Text>
                        Q2
                    </Text>
                </TouchableOpacity>
                ) : (null)}
                { props.qualifyingResults[0].Q3 ? (
                    <TouchableOpacity
                    key="Q3"
                    className={`flex h-full w-1/3 items-center ${qualifyingPart === "Q3" ? "bg-red-700" : "bg-white"}`}
                    accessibilityRole="button"
                    onPress={() => setQualifyingPart("Q3")}>
                    <Text>
                        Q3
                    </Text>
                </TouchableOpacity>
                ) : (null)}
            </View>
            <View>
                { props.qualifyingResults
                .filter((driver: DriverQualifyingResult) => qualifyingPart in driver)
                .sort((driver1: DriverQualifyingResult, driver2: DriverQualifyingResult) => { return driver1[qualifyingPart] > driver2[qualifyingPart] })
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
                                { driver[qualifyingPart] }
                            </Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}