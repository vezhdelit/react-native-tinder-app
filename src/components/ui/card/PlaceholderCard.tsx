import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const PlaceholderCard = () => {
  return (
    <View
      style={styles.cardShadow}
      className="relative h-3/4 items-center justify-center space-y-4 rounded-xl bg-white"
    >
      <Image
        resizeMode="contain"
        className="h-20 w-full"
        source={{ uri: "https://links.papareact.com/6gb" }}
      />
      <View className=" items-center">
        <Text className="text-2xl font-medium">No more bitches for you</Text>
        <Text className="text-xl">Try again later</Text>
      </View>
    </View>
  );
};

export default PlaceholderCard;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
