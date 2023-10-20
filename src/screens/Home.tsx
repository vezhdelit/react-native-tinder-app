import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

const Home = ({ navigation }: any) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Home</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
        <Text>Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
