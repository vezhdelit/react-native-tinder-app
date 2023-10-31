import { View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getMatchedUserInfo } from "../../utils";
import { FIREBASE_APP, FIREBASE_AUTH } from "../../firebaseConfig";

const ChatRow = ({ matchDetails }: any) => {
  const navigation = useNavigation<any>();
  const user = FIREBASE_AUTH.currentUser;
  const [matchedUserInfo, setMachedUserInfo] = useState<any>(null);

  useEffect(() => {
    setMachedUserInfo(getMatchedUserInfo(matchDetails.users, user?.uid));
  }, [matchDetails, user]);

  return (
    <TouchableOpacity className="flex flex-row items-center space-x-4 rounded-lg bg-white p-4">
      <Image
        className=" h-14 w-14 rounded-full"
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text className=" text-base font-medium">
          {matchedUserInfo.displayName}
        </Text>
        <Text>Say Hi!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
