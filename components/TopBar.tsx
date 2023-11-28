import { View, Text } from "react-native";

export default function TopBar() {
    return (
        <View className="bg-black h-24 flex flex-row items-end pb-2 pl-3">
            <Text className="text-white text-3xl font-extrabold italic">
                <Text className="text-main-red">
                F1 {""}
                </Text>
                FACTS APP
            </Text>
        </View>
    )
}