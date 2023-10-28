import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

const PassButton = ({ onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" h-16 w-16 items-center justify-center rounded-full bg-red-200"
    >
      <Entypo name="cross" size={30} color="red" />
    </TouchableOpacity>
  );
};

export default PassButton;
