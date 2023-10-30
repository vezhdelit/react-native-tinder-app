import { FlatList, View, Text } from "react-native";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const user = FIREBASE_AUTH.currentUser;
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(FIRESTORE_DB, "matches"),
        where("usersMatched", "array-contains", user?.uid)
      ),
      (snapshot) =>
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
    );
  }, [user]);

  if (matches.length <= 0) {
    return (
      <View>
        <Text>No matches yet!</Text>
      </View>
    );
  }
  return (
    <View className=" gap-4">
      <FlatList
        data={matches}
        renderItem={({ item }) => (
          <View className="px-4 py-2">
            <ChatRow matchDetails={item} />
          </View>
        )}
      />
    </View>
  );
};

export default ChatList;
