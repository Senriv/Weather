import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import ReconnectModalAlert from "@/src/components/ReconnectModalAlert/ReconnectModalAlert";
import CustomSplashScreen from "@/src/components/CustomSplashScreen/CustomSplashScreen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      // Загрузка данных или инициализация
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setAppReady(true);

      // Скрытие стандартного сплэш-экрана
      await SplashScreen.hideAsync();
    }

    prepareApp();
  }, []);

  if (!isAppReady) {
    return <CustomSplashScreen />;
  }
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      <ReconnectModalAlert />
    </>
  );
}
