import { Image, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

function CustomSplashScreen() {
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        source={require("../../../assets/images/bg.png")}
        className="absolute h-full w-full"
        blurRadius={70}
      />

      <View className="flex-1 flex justify-center items-center gap-3">
        <Image
          source={require("../../../assets/images/moderaterain.png")}
          className="h-52 w-52"
        />
        <Text className="text-white font-bold text-3xl">Weather App</Text>
      </View>
    </View>
  );
}

export default CustomSplashScreen;
