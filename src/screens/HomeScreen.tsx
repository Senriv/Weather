import { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import * as Progress from "react-native-progress";
import { storeData, getData } from "../utils/asyncStorage";
import { getWeatherImage } from "../constants";
import { WeatherType } from "../types/weatherType";
import { LocationType } from "../types/locationType";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";

export default function HomeScreen() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLocation = (location: LocationType) => {
    setLocations([]);
    setShowSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: location.name,
      days: "7",
    }).then((data) => {
      setWeather(data as WeatherType);
      setLoading(false);
      storeData("city", location.name);
    });
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => {
        if (data) {
          setLocations(data);
        } else {
          setLocations([]);
        }
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = "Stavanger";
    if (myCity) cityName = myCity;

    fetchWeatherForecast({ cityName, days: "7" }).then((data) => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 600), []);

  const { current, location } = weather || {};

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        source={require("../../assets/images/bg.png")}
        className="absolute h-full w-full"
        blurRadius={70}
      />

      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* search section */}
          <View style={{ height: "7%" }} className="mx-4 relative z-50">
            <View
              style={{
                backgroundColor: showSearch
                  ? theme.bgWhite(0.2)
                  : "transparent",
                borderRadius: 50,
                overflow: "hidden",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor={"lightgray"}
                  className="pl-6 h-10 flex-1 text-base text-white pb-1"
                />
              ) : null}

              <TouchableOpacity
                onPress={() => setShowSearch(!showSearch)}
                style={{ backgroundColor: theme.bgWhite(0.3) }}
                className="rounded-full p-3 m-1"
              >
                <MagnifyingGlassIcon size="25" color="white" />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                {locations.map((location, index) => {
                  let showBorder = index + 1 != locations.length;
                  let borderClass = showBorder
                    ? "border-b-2 border-b-gray-400"
                    : "";
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(location)}
                      key={index}
                      className={
                        "flex-row items-center border-0 p-3 px-4 mb-1 " +
                        borderClass
                      }
                    >
                      <MapPinIcon size="20" color="gray" />
                      <Text className="text-black text-lg ml-2">
                        {location?.name}, {location?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>
          {/* forecast section */}
          <View className="mx-4 flex justify-around flex-1 mb-2">
            {/* location */}
            <Text className="text-white text-center text-2xl font-bold">
              {location?.name},{" "}
              <Text className="text-lg font-semibold text-gray-300">
                {location?.country}
              </Text>
            </Text>
            {/* weather image */}
            <View className="flex-row justify-center">
              <Image
                // source={{ uri: "https:" + current?.condition?.icon }}
                source={getWeatherImage(current?.condition?.text || "other")}
                className="w-52 h-52"
              />
            </View>
            {/* degree celcius */}
            <View className="space-y-2">
              <Text className="text-center font-bold text-white text-6xl ml-5">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center text-white text-xl tracking-widest">
                {current?.condition?.text}
              </Text>
            </View>
            {/* other stats */}
            <View className="flex-row justify-between mx-4">
              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../../assets/icons/wind.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base ml-2">
                  {current?.wind_kph}km
                </Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../../assets/icons/drop.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base ml-2">
                  {current?.humidity}%
                </Text>
              </View>

              <View className="flex-row space-x-2 items-center">
                <Image
                  source={require("../../assets/icons/sun.png")}
                  className="h-6 w-6"
                />
                <Text className="text-white font-semibold text-base ml-2">
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>

          {/* forecast for next days */}
          <View className="mb-2 space-y-3">
            <View className="flex-row items-center mx-5 space-x-2 mb-2">
              <CalendarDaysIcon size="22" color="white" />
              <Text className="text-white text-base">Daily forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{ paddingHorizontal: 15 }}
              showsHorizontalScrollIndicator={false}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                let date = new Date(item.date);
                let dayName = date.toLocaleDateString("en-US", {
                  weekday: "long",
                });
                dayName = dayName.split(",")[0];
                return (
                  <View
                    key={index}
                    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
                    style={{ backgroundColor: theme.bgWhite(0.15) }}
                  >
                    <Image
                      // source={weatherImages[item?.day?.condition?.text.trim()]}
                      source={getWeatherImage(
                        item?.day?.condition?.text.trim() || "other"
                      )}
                      className="h-11 w-11"
                    />
                    <Text className="text-white">{dayName}</Text>
                    <Text className="text-white text-xl font-semibold">
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
