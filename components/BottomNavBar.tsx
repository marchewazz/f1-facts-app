import { faCalendar, faTrophy, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { Text, TouchableOpacity, View } from "react-native"

export default function BottomNavBar(props: BottomTabBarProps) {    
    
    return (
        <View className="flex flex-row justify-between h-14 w-full bg-black">
            { props.state.routes.map((route: any, index: number) => { 
                if (route.name != "SingleGPScreen" && route.name != "RaceResultsScreen") {
                    return (
                        <TouchableOpacity
                        key={index}
                        className={`flex flex-col justify-evenly h-full w-auto items-center`}
                        accessibilityRole="button"
                        onPress={() => props.navigation.navigate(route.name)}>
                            { route.name === "Facts" ? (
                                <FontAwesomeIcon icon={faLightbulb} size={22} color={`${props.state.index === index ? "#FF1801" : "#FFF"}`} />
                            ):(null)}
                            { route.name === "Drivers standings" ? (
                                <FontAwesomeIcon icon={faTrophy} size={22} color={`${props.state.index === index ? "#FF1801" : "#FFF"}`} />
                            ):(null)}
                            { route.name === "Constructors standings" ? (
                                <FontAwesomeIcon icon={faTrophy} size={22} color={`${props.state.index === index ? "#FF1801" : "#FFF"}`} />
                            ):(null)}
                            { route.name === "Calendar" ? (
                                <FontAwesomeIcon icon={faCalendar} size={22} color={`${props.state.index === index ? "#FF1801" : "#FFF"}`} />
                            ):(null)}
                            <Text className={`font-bold ${props.state.index === index ? "text-main-red" : "text-white"}`}>
                                { route.name }
                            </Text>
                        </TouchableOpacity>
                    )
                }
            }) }
        </View>
    )
}