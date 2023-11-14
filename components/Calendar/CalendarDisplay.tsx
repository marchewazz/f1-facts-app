import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import RaceSchedule from "../../models/RaceSchedule.model";

export default function CalendarDisplay() {
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

    const [calendar, setCalendar] = useState<RaceSchedule[]>([]);

    const [ready, setReady] = useState<boolean>(false)

    async function getCalendar() {
        try {
            setReady(false)
            const response = await fetch(`http://ergast.com/api/f1/${value.year}.json`)
            const json = await response.json();
           
            setCalendar(json.MRData.RaceTable.Races as RaceSchedule[]);
          } catch (error) {
            console.error(error);
          } finally {
            setReady(true);
          }
    }

    useEffect(() => {
        getCalendar()
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
                    { calendar.map((race: RaceSchedule) => {
                        return (
                            <View key={`${race.season}-${race.round}`} className="flex flex-row justify-between">
                                <Text>
                                    { race.raceName }
                                </Text>
                                <Text>
                                    { race.date }
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