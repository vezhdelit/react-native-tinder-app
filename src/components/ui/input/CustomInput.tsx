import { View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface CustomInputProps {
  value?: string;
  placeholderText?: string;
  onChangeText?: any;
  containerClassname?: string; // Tailwind classname styling for the input container
  textClassname?: string; // Tailwind classname styling for text within the input
  isSecureTextEntry?: boolean;
  isShowToggle?: boolean;
}

const CustomInput = ({
  value,
  onChangeText,
  containerClassname,
  textClassname,
  placeholderText,
  isSecureTextEntry,
  isShowToggle,
}: CustomInputProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  return (
    <View
      className={` flex flex-row items-center justify-between rounded-lg bg-white p-4 dark:bg-neutral-800 ${containerClassname}`}
    >
      <TextInput
        className={`flex-1 dark:text-white ${textClassname}`}
        placeholderTextColor={"gray"}
        placeholder={placeholderText}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecureTextEntry && isPasswordHidden}
      />
      {isShowToggle && (
        <TouchableOpacity
          onPress={() => setIsPasswordHidden(!isPasswordHidden)}
        >
          <Ionicons
            name={isPasswordHidden ? "ios-eye-off" : "ios-eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;
