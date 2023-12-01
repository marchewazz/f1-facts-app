import { View, Text, ScrollView } from "react-native";
import Constructor from "../models/Constructor.model";
import { useCallback, useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { useFocusEffect } from "@react-navigation/native";

export default function ConstructorsStandingsScreen() {
    const [years, setYears] = useState<{
        year: string
    }[]>([
        {
            year: ""
        }
    ]);

    const [value, setValue] = useState<{
        year: string
    }>({year: "2023"});

    const [standings, setStandings] = useState<Constructor[]>([]);

    const [ready, setReady] = useState<boolean>(false)

    async function getStandings() {
        try {
            setReady(false)
            let standings: Constructor[] = [];
            const response = await fetch(`http://ergast.com/api/f1/${value.year}/constructorStandings.json`)
            const json = await response.json();
            standings = json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            for (const index in standings) {
                const response = await fetch(`http://ergast.com/api/f1/${value.year}/constructors/${standings[index].Constructor.constructorId}/drivers.json`)
                // console.log(`http://ergast.com/api/f1/${value.year}/constructors/${standings[index].Constructor.constructorId}/drivers.json`);
                
                const json = await response.json();
                // console.log(standings[index].Constructor.constructorId);
                
                // console.log(json.MRData.DriverTable.Drivers);
                
                standings[index].Drivers = json.MRData.DriverTable.Drivers.reverse();
            }
            setStandings(standings);
          } catch (error) {
            console.error(error);
          } finally {
            setReady(true);
          }
    }

    useEffect(() => {
        getStandings()
    }, [value])
    

    useEffect(() => {
        let years: {
            year: string
        }[]  = []

        for (let i = 2023; i >= 1958; i--) {
            years.push({
                year: i.toString()
            })
        }

        setYears(years)
    }, [])

    return (
        <View className="bg-main-background min-h-screen">
            <Dropdown 
                className="bg-white p-2"
                data={years} 
                labelField="year"
                valueField="year"
                value={value}
                placeholder="Choose a year..."
                onChange={(value) => {
                    setValue(value)
                }}
            />
            { ready ? (
                <ScrollView className="px-2 py-1">
                    { standings.map((constructor: Constructor) => {
                        return (
                            <View key={constructor.Constructor.constructorId} className="flex flex-row items-center justify-between w-full my-1 mb-1">
                                <Text className="w-12 text-2xl text-white">
                                    { constructor.positionText }
                                </Text>
                                <View className="flex justify-center items-start grow break-words w-10">
                                    <Text className="text-lg text-white">
                                        { constructor.Constructor.name }
                                    </Text>
                                    { constructor.Drivers ? (
                                        <Text className="text-lg text-white">
                                            { constructor.Drivers.map((driver, index) => {
                                                return `${driver.familyName}${index != constructor.Drivers.length - 1 ? ", " : ""}` 
                                            })}
                                        </Text>
                                    ) : (null)}
                                </View>
                                <Text className="text-2xl justify-self-end text-white w-12 text-end">
                                    { constructor.points }
                                </Text>
                            </View>
                        )
                    })}
                </ScrollView>
            ) : (
                <Text className="text-lg text-white">
                    Loading...
                </Text>
            )}
        </View>
    )
}