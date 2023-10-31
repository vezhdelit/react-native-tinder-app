import { View, Text } from "react-native";
import React from "react";

const SenderMessage = ({ message }: any) => {
  return (
    <View className=" ml-auto self-start py-1">
      <View className="rounded-lg rounded-tr-none bg-purple-600 px-5 py-3">
        <Text className=" text-white">{message.content}</Text>
      </View>
    </View>
  );
};

export default SenderMessage;
