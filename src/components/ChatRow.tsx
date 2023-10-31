import { View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getMatchedUserInfo } from "../../utils";
import {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIRESTORE_DB,
} from "../../firebaseConfig";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const ChatRow = ({ matchDetails }: any) => {
  const navigation = useNavigation<any>();
  const user = FIREBASE_AUTH.currentUser;
  const [matchedUserInfo, setMachedUserInfo] = useState<any>(null);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    setMachedUserInfo(getMatchedUserInfo(matchDetails.users, user?.uid));
  }, [matchDetails, user]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(FIRESTORE_DB, "matches", matchDetails.id, "messages"),
          orderBy("createdAt", "desc"),
          limit(1)
        ),
        (snapshot) => setLastMessage(snapshot.docs[0]?.data()?.content)
      ),
    [matchDetails, FIRESTORE_DB]
  );

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Messages", {
          matchDetails,
        });
      }}
      className="flex flex-row items-center space-x-4 rounded-lg bg-white p-4"
    >
      <Image
        className=" h-14 w-14 rounded-full"
        source={{
          uri:
            matchedUserInfo?.photoURL ||
            "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png",
        }}
      />
      <View>
        <Text className=" text-base font-medium">
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
