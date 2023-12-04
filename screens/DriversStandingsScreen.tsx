import { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import Driver from "../models/Driver.model";
import LoadingComponent from "../components/LoadingComponent";

export default function DriversStandingsScreen() {

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

    const [standings, setStandings] = useState<Driver[]>([]);

    const [ready, setReady] = useState<boolean>(false)

    async function getStandings() {
        try {
            setReady(false)
            const response = await fetch(`http://ergast.com/api/f1/${value.year}/driverStandings.json`)
            const json = await response.json();
            // console.log(json.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            setStandings(json.MRData.StandingsTable.StandingsLists[0].DriverStandings as Driver[]);
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

        for (let i = 2023; i >= 1950; i--) {
            years.push({
                year: i.toString()
            })
        }

        setYears(years)
    }, [])

    return (
        <View className="bg-main-background pb-2" style={{ height: Dimensions.get("window").height - 119 }}>
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
                    { standings.map((driver: Driver) => {
                        return (
                            <View key={driver.Driver.driverId} className="flex flex-row items-center justify-between w-full my-1">
                                <Text className="w-10 text-2xl text-white">
                                    { driver.positionText }
                                </Text>
                                <View className="flex justify-center items-start grow">
                                    <Text className="text-lg text-white">
                                        { driver.Driver.givenName } { driver.Driver.familyName }
                                    </Text>
                                    <Text className="text-lg text-white">
                                        { driver.Constructors.length > 1 ? (
                                            driver.Constructors.map((constructor, index) => {
                                                return `${constructor.name}${index != driver.Constructors.length - 1 ? "/" : ""}` 
                                            })
                                        ) : (
                                            driver.Constructors[0].name
                                        )}
                                    </Text>
                                </View>
                                <Text className="text-2xl justify-self-end text-white text-right">
                                    { driver.points }
                                </Text>
                            </View>
                        )
                    })}
                </ScrollView>
            ) : (
                <View style={{ height: Dimensions.get("window").height - 119 }} className="flex justify-center">
                    <LoadingComponent />
                </View>
            )}
        </View>
    )
}