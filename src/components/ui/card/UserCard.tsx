import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const UserCard = ({ card }: any) => {
  return (
    <View
      key={card.id}
      style={styles.cardShadow}
      className="relative h-3/4 items-center justify-center rounded-xl bg-white"
    >
      <Image
        className="h-full w-full rounded-xl"
        source={{ uri: card.photoURL }}
      />
      <View className="absolute bottom-0 flex w-full flex-row items-center justify-between rounded-b-xl bg-white p-6 pb-10">
        <View className="flex flex-col">
          <Text className="text-xl font-bold">{card.displayName}</Text>
          <Text>{card.job}</Text>
        </View>
        <Text className="text-xl font-bold">{card.age}</Text>
      </View>
    </View>
  );
};

export default UserCard;

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
