import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swiper from "react-native-deck-swiper";

const DUMMY_DATA = [
  {
    id: 1,
    firstName: "Dummy",
    lastName: "Dum",
    job: "Professional dummy",
    photoURL:
      "https://tododisfraz.com.ar/wp-content/uploads/2022/10/Todo-Disfraz-Crash-Test-Dummy-2779.jpg",
    age: 27,
  },
  {
    id: 2,
    firstName: "Dummy2",
    lastName: "Dum2",
    job: "Professional dummy 2",
    photoURL: "https://pbs.twimg.com/media/EIPvhdsXsAIXz9A?format=jpg",
    age: 22,
  },
  {
    id: 3,
    firstName: "Dummy2",
    lastName: "Dum2",
    job: "Professional dummy 2",
    photoURL: "https://pbs.twimg.com/media/EIPvhdsXsAIXz9A?format=jpg",
    age: 22,
  },
  {
    id: 4,
    firstName: "Dummy2",
    lastName: "Dum2",
    job: "Professional dummy 2",
    photoURL: "https://pbs.twimg.com/media/EIPvhdsXsAIXz9A?format=jpg",
    age: 22,
  },
  {
    id: 5,
    firstName: "Dummy2",
    lastName: "Dum2",
    job: "Professional dummy 2",
    photoURL: "https://pbs.twimg.com/media/EIPvhdsXsAIXz9A?format=jpg",
    age: 22,
  },
  {
    id: 5,
    firstName: "Dummy2",
    lastName: "Dum2",
    job: "Professional dummy 2",
    photoURL: "https://pbs.twimg.com/media/EIPvhdsXsAIXz9A?format=jpg",
    age: 22,
  },
];

const Home = ({ navigation }: any) => {
  const user = FIREBASE_AUTH.currentUser;

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1">
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

        <TouchableOpacity onPress={() => {}}>
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

      <View className="-z-10 -mt-12 flex-1">
        <Swiper
          backgroundColor="transparent"
          stackSize={2}
          cardIndex={0}
          verticalSwipe={false}
          overlayLabels={{
            left: {
              element: (
                <Text className="border-spacing-1 rounded-xl bg-red-600 p-2  text-right text-3xl font-bold text-white">
                  PASS
                </Text>
              ) /* Optional */,
              title: "PASS",
              style: {
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  padding: 20,
                },
              },
            },

            right: {
              element: (
                <Text className="border-spacing-1 rounded-xl bg-green-600 p-2  text-3xl font-bold text-white ">
                  SMASH
                </Text>
              ) /* Optional */,
              title: "SMASH",
              style: {
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  padding: 20,
                },
              },
            },
          }}
          cards={DUMMY_DATA}
          renderCard={(card) => {
            return (
              <View
                key={card.id}
                style={styles.cardShadow}
                className="relative h-3/4 items-center justify-center rounded-xl bg-white"
              >
                <Image
                  className="h-full w-full rounded-xl"
                  source={{ uri: card.photoURL }}
                />
                <View className="absolute bottom-0 flex w-full flex-row items-center justify-between rounded-b-xl bg-white p-6 pb-10">
                  <View className="flex flex-col">
                    <Text className="text-xl font-bold">
                      {card.firstName} {card.lastName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text className="text-xl font-bold">{card.age}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
