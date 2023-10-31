import { View, Text } from "react-native";
import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatList from "../components/ChatList";

const ChatScreen = () => {
  return (
    <View>
      <ChatHeader title="Chats" favouriteEnabled />
      <ChatList />
    </View>
  );
};

export default ChatScreen;
