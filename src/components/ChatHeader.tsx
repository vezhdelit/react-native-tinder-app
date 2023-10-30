import { View, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons, Foundation } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChatHeader = ({ title, favouriteEnabled }: any) => {
  const navigation = useNavigation<any>();

  return (
    <View className=" flex flex-row items-center justify-between p-4">
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        className="flex flex-row items-center space-x-2"
      >
        <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        <Text className="text-2xl font-bold">{title}</Text>
      </TouchableOpacity>
      {favouriteEnabled && (
        <TouchableOpacity className="pr-2">
          <Ionicons name="heart" size={34} color="#FF5864" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatHeader;
