import { View, Text, ActivityIndicator } from "react-native";

export default function LoadingComponent() {
    return (
        <View className="flex flex-row justify-between w-[40%] mx-auto items-center my-3">
            <Text className="text-white text-2xl font-bold">
                Loading
            </Text>
            <ActivityIndicator size={40} color="#FF1801" />
        </View>
    )
}