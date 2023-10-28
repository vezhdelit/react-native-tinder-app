import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const SmashButton = ({ onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" h-16 w-16 items-center justify-center rounded-full bg-green-200"
    >
      <AntDesign name="heart" size={24} color="green" />
    </TouchableOpacity>
  );
};

export default SmashButton;
