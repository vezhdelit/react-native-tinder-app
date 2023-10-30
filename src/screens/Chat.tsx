import { View, Text } from "react-native";
import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";

const Chat = () => {
  return (
    <View>
      <ChatHeader title="Chats" favouriteEnabled />
      <ChatList />
    </View>
  );
};

export default Chat;
