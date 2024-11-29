import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { theme } from "@/src/theme";

const ReconnectModalAlert: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      const { isConnected } = state;
      if (!isConnected) {
        setShowModal(true);
      } else if (showModal) {
        setTimeout(() => setShowModal(false), 1000);
      }
      setIsConnected(isConnected ?? true);
    });

    return () => unsubscribe();
  }, [showModal]);

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: theme.bgWhite(0.15) }}
      >
        <View
          className="p-5 rounded-xl items-center"
          style={{ backgroundColor: theme.bgWhite(0.15) }}
        >
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white text-base font-bold mt-3">
            {isConnected ? "Reconnected!" : "Reconnecting..."}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default ReconnectModalAlert;
