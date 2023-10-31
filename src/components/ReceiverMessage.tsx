import { View, Text, Image } from "react-native";
import React from "react";

const ReceiverMessage = ({ message }: any) => {
  return (
    <View className=" flex flex-row items-center space-x-2 self-start py-1">
      <Image
        className="h-12 w-12 rounded-full"
        source={{ uri: message.photoURL }}
      />
      <View className="rounded-lg rounded-tl-none bg-red-400 px-5 py-3">
        <Text className=" text-white">{message.content}</Text>
      </View>
    </View>
  );
};

export default ReceiverMessage;
