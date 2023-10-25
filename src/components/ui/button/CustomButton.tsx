import { Text, GestureResponderEvent, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  containerClassname?: string; // Tailwind classname styling for the button container
  textClassname?: string; // Tailwind classname styling for text within the button
  isDisabled?: boolean;
  onPress: (event: GestureResponderEvent) => void; // Event handler}
}
const CustomButton = ({
  title,
  containerClassname,
  textClassname,
  isDisabled,
  onPress,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${
        isDisabled ? " bg-gray-500" : " bg-blue-500"
      } relative items-center justify-center rounded-lg p-4 ${containerClassname}`}
    >
      <Text className={`text-base font-medium text-white  ${textClassname}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
