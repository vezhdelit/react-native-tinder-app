import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation<any>();

  const user = FIREBASE_AUTH.currentUser;

  useLayoutEffect(
    () =>
      onSnapshot(doc(FIRESTORE_DB, "users", user?.uid || ""), (snapshot) => {
        if (!snapshot.exists()) {
          navigation.navigate("EditProfile");
        }
      }),
    []
  );

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <View className=" relative   flex  flex-row items-center justify-center p-4">
      <TouchableOpacity className=" absolute left-4" onPress={handleSignOut}>
        <Image
          className="h-10 w-10 rounded-full"
          source={{
            uri:
              user?.photoURL ||
              "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png",
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      >
        <Image
          className="h-14 w-14 rounded-full"
          source={{
            uri: "https://cdn3.iconfinder.com/data/icons/social-network-flat-3/100/Tinder-256.png",
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className=" absolute right-4"
        onPress={() => navigation.navigate("Chat")}
      >
        <Ionicons name="chatbubbles" size={40} color="#FF5864" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
