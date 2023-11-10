import { View, Text } from "react-native";
import Constructor from "../models/Constructor.model";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

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
            const response = await fetch(`http://ergast.com/api/f1/${value.year}/constructorStandings.json`)
            const json = await response.json();
            // console.log(json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
            setStandings(json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings as Constructor[]);
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
                    { standings.map((constructor: Constructor) => {
                        return (
                            <View className="flex flex-row justify-between">
                                <Text>
                                    { constructor.Constructor.name }
                                </Text>
                                <Text>
                                    { constructor.points }
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