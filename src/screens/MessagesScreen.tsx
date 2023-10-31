import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import { getMatchedUserInfo } from "../../utils";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import CustomInput from "../components/ui/input/CustomInput";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const MessagesScreen = ({ route }: any) => {
  const user = FIREBASE_AUTH.currentUser;
  const { matchDetails } = route.params;
  const matchedUserInfo = getMatchedUserInfo(matchDetails?.users, user?.uid);
  const [value, setValue] = useState<any>("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(FIRESTORE_DB, "matches", matchDetails.id, "messages"),
          orderBy("createdAt", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, FIRESTORE_DB]
  );

  const sendMessage = () => {
    addDoc(collection(FIRESTORE_DB, "matches", matchDetails.id, "messages"), {
      userId: user?.uid,
      displayName: user?.displayName,
      photoURL: matchDetails.users[user?.uid || ""].photoURL,
      content: value,
      createdAt: serverTimestamp(),
    });

    setValue("");
  };

  return (
    <View className="flex-1">
      <ChatHeader title={matchedUserInfo?.displayName} favouriteEnabled />
      <View className="flex-1  justify-between  px-4 pb-4">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} className="pb-4">
          <FlatList
            data={messages}
            inverted={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) => {
              return message.userId === user?.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              );
            }}
          />
        </TouchableWithoutFeedback>

        <View className="pt-4">
          <CustomInput
            value={value}
            onChangeText={(text: string) => {
              setValue(text);
            }}
            isSendButtonDisabled={value === ""}
            enableSendButtonIcon
            onPressSend={sendMessage}
            placeholderText="Say something.."
          />
        </View>
      </View>
    </View>
  );
};

export default MessagesScreen;
