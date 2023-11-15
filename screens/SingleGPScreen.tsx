import { View, Text } from "react-native";

import RaceSchedule from "../models/RaceSchedule.model";

export default function SingleGPScreen(props: any) {

    const schedule: RaceSchedule = props.route.params.schedule;

    return (
        <View>
            <Text>{`${schedule.season} ${schedule.raceName}` }</Text>
            { schedule.Sprint  ? (
                <>
                    { schedule.season === "2023" ? (
                        <>
                            { schedule.FirstPractice ? (
                                <Text>
                                    {`First practice: ${schedule.FirstPractice.date} ${schedule.FirstPractice.time ?? ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.Qualifying ? (
                                <Text>
                                    {`Qualifying: ${schedule.Qualifying.date} ${schedule.Qualifying.time ?? ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.SecondPractice ? (
                                <Text>
                                    {`Sprint qualifying: ${schedule.SecondPractice.date} ${schedule.SecondPractice.time ?? ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.Sprint ? (
                                <Text>
                                    {`Sprint: ${schedule.Sprint.date} ${schedule.Sprint.time ?? ""}`}
                                </Text>
                            ) : (null)}
                        </>
                    ) : (
                        <>
                            { schedule.FirstPractice ? (
                                <Text>
                                    {`First practice: ${schedule.FirstPractice.date} ${schedule.FirstPractice.time ?? ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.Qualifying ? (
                                <Text>
                                    {`Qualifying: ${schedule.Qualifying.date} ${schedule.Qualifying.time ?? ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.SecondPractice ? (
                                <Text>
                                    {`Second pracitce: ${schedule.SecondPractice.date} ${schedule.SecondPractice.time ?? ""}`}
                                </Text>
                            ) : (null)}
                            { schedule.Sprint ? (
                                <Text>
                                    {`Sprint: ${schedule.Sprint.date} ${schedule.Sprint.time ?? ""}`}
                                </Text>
                            ) : (null)}
                        </>
                    )}
                </>
            ) : (
                <>
                    { schedule.FirstPractice ? (
                        <Text>
                            {`First practice: ${schedule.FirstPractice.date} ${schedule.FirstPractice.time ?? ""}`}
                        </Text>
                    ) : (null)}
                    { schedule.SecondPractice ? (
                        <Text>
                            {`Second pracitce: ${schedule.SecondPractice.date} ${schedule.SecondPractice.time ?? ""}`}
                        </Text>
                    ) : (null)}
                    { schedule.ThirdPractice ? (
                        <Text>
                            {`Thrid practice: ${schedule.ThirdPractice.date} ${schedule.ThirdPractice.time ?? ""}`}
                        </Text>
                    ) : (null)}
                    { schedule.Qualifying ? (
                        <Text>
                            {`Qualifying: ${schedule.Qualifying.date} ${schedule.Qualifying.time ?? ""}`}
                        </Text>
                    ) : (null)}
                </>
            )}
            <Text>
                {`Race: ${schedule.date} ${schedule.time ?? ""}`}
            </Text>
        </View>
    )
}