import { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import RaceSchedule from "../../models/RaceSchedule.model";
import { getDate } from "../../util/dateFunctions";
import LoadingComponent from "../LoadingComponent";

export default function CalendarDisplay(props: { navigation: any }) {
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
        <>
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
                    { calendar.map((race: RaceSchedule) => {
                        return (
                            <View key={`${race.season}-${race.round}`} className="flex flex-row items-center justify-between w-full my-1">
                                <Text className="text-lg text-white underline" onPress={() => props.navigation.navigate("SingleGPScreen", { schedule: race })}>
                                    { race.raceName }
                                </Text>
                                <Text className="text-lg text-white">
                                    { getDate(new Date(`${race.date}T${race.time ?? "0:00:00"}`)) }
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
        </>
    )
}