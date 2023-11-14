import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { ParamListBase } from "@react-navigation/native";
import { StatusBar, Text, TouchableOpacity, View } from "react-native"

export default function BottomNavBar(props: BottomTabBarProps) {    
    
    return (
        <View className="flex flex-row justify-between h-12 w-full">
            { props.state.routes.map((route: any, index: number) => { 
                return (
                    <TouchableOpacity
                    key={index}
                    className={`flex h-full items-center ${props.state.index === index ? "bg-red-700" : "bg-white"}`}
                    accessibilityRole="button"
                    onPress={() => props.navigation.navigate(route.name)}>
                        <Text>
                            { route.name }
                        </Text>
                    </TouchableOpacity>
                )
            }) }
        </View>
    )
}