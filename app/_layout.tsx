import { Stack } from "expo-router";
import "../global.css";
import ReconnectModalAlert from "@/src/components/ReconnectModalAlert/ReconnectModalAlert";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      <ReconnectModalAlert />
    </>
  );
}
