import { SafeAreaView, Text } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text className="text-green-800 text-xl font-bold">HomeScreen</Text>
      <Text className="text-red-500 text-xl font-bold">HomeScreen</Text>
    </SafeAreaView>
  );
}
