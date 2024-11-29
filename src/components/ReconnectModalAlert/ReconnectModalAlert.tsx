import React, { useState, useEffect } from "react";
import { View, Text, Modal, ActivityIndicator } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

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
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <View
          className="p-5 rounded-xl items-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
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

export default ReconnectModalAlert;
