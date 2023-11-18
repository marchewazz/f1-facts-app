import { useEffect, useState } from "react";
import { View, Text } from "react-native";

import { Dropdown } from "react-native-element-dropdown";
import Driver from "../models/Driver.model";

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
        <View>
            <Dropdown 
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
                <>
                    { standings.map((driver: Driver) => {
                        return (
                            <View key={driver.Driver.driverId} className="flex flex-row justify-between">
                                <Text>
                                    { driver.positionText }
                                </Text>
                                <Text>
                                    { driver.Driver.givenName } { driver.Driver.familyName }
                                </Text>
                                <Text>
                                    { driver.points }
                                </Text>
                            </View>
                        )
                    })}
                </>
            ) : (
                <Text>
                    Loading...
                </Text>
            )}
        </View>
    )
}