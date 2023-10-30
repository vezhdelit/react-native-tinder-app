import { View, Image, Text } from "react-native";
import React from "react";
import CustomButton from "../components/ui/button/CustomButton";

const Match = ({ navigation, route }: any) => {
  const { loggedInUser, userSwiped } = route.params;

  return (
    <View className="flex-1 items-center justify-center space-y-4  bg-red-400/90">
      <Image
        className=" h-20 w-full"
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/mg9" }}
      />
      <Text className="text-center text-lg font-bold text-white">
        You and {userSwiped.displayName} liked each other!
      </Text>

      <View className=" flex w-full flex-row justify-evenly p-4">
        <Image
          className=" h-32 w-32 rounded-full"
          source={{ uri: loggedInUser.photoURL }}
        />
        <Image
          className=" h-32 w-32 rounded-full"
          source={{ uri: userSwiped.photoURL }}
        />
      </View>
      <View className="w-full p-4">
        <CustomButton
          onPress={() => {
            navigation.goBack();
            navigation.navigate("Chat");
          }}
          containerClassname="bg-white h-20 rounded-full"
          textClassname=" text-black"
          title="Send a message!"
        />
      </View>
    </View>
  );
};

export default Match;
