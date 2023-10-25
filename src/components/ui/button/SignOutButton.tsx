import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";

const handleSignOut = async () => {
  try {
    await FIREBASE_AUTH.signOut();
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

const SignOut = () => {
  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Ionicons name="log-out" size={32} color="#f44336" />
    </TouchableOpacity>
  );
};

export default SignOut;
