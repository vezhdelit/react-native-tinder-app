import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ProgressBar from "./ProgressBar";

const Uploading = ({ image, progress }: any) => {
  return (
    <View className=" absolute z-20 h-screen w-screen items-center justify-center bg-black/50">
      <View className="w-3/4 items-center justify-center space-y-4 rounded-lg bg-white py-6 ">
        {image && (
          <Image
            className=" h-24 w-24 rounded-md"
            resizeMode="contain"
            source={{
              uri: image,
            }}
          />
        )}
        <Text className="">Uploading...</Text>
        <ProgressBar progress={progress} />
        <View className=" h-[1px] w-full bg-black/10"></View>

        <TouchableOpacity
          onPress={() => {}}
          className=" flex items-center justify-center"
        >
          <Text className=" text-xl text-blue-500">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Uploading;
