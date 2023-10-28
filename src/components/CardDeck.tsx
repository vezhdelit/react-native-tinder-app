import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  snapshotEqual,
  where,
} from "firebase/firestore";

interface Profile {
  id: string;
  displayName?: string;
  job?: string;
  photoURL?: string;
  age?: number;
}

const CardDeck = ({ swipeRef }: any) => {
  const user = FIREBASE_AUTH.currentUser;
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const fetchCards = async () => {
    const passesSnapshot = await getDocs(
      collection(FIRESTORE_DB, "users", user?.uid || "", "passes")
    );
    const passes = passesSnapshot.docs.map((doc) => doc.id);
    const passedUserIds = passes.length > 0 ? passes : [""];

    const matchesSnapshot = await getDocs(
      collection(FIRESTORE_DB, "users", user?.uid || "", "matches")
    );
    const matches = matchesSnapshot.docs.map((doc) => doc.id);
    const matchesUserIds = matches.length > 0 ? matches : [""];

    // Combine both passed and matched user IDs
    const excludedUserIds = [...passedUserIds, ...matchesUserIds];

    onSnapshot(
      query(
        collection(FIRESTORE_DB, "users"),
        where("id", "not-in", excludedUserIds)
      ),
      (snapshot) => {
        const docs = snapshot.docs
          .filter((doc) => doc.id !== user?.uid)
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setProfiles(docs);
      }
    );
  };

  useEffect(() => {
    fetchCards();
  }, [FIRESTORE_DB]);

  const swipeLeft = async (cardIndex: number) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    setDoc(
      doc(FIRESTORE_DB, "users", user?.uid || "Error", "passes", userSwiped.id),
      userSwiped
    );
  };

  const swipeRight = async (cardIndex: number) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];

    setDoc(
      doc(
        FIRESTORE_DB,
        "users",
        user?.uid || "Error",
        "matches",
        userSwiped.id
      ),
      userSwiped
    );
  };

  return (
    <View className="-z-10 -mt-10 h-3/4">
      <Swiper
        ref={swipeRef}
        containerStyle={{ backgroundColor: "transparent" }}
        backgroundColor="transparent"
        cards={profiles}
        stackSize={3}
        cardIndex={0}
        verticalSwipe={false}
        onSwipedAll={() => {
          swipeRef.current.swipeLeft();
        }}
        onSwipedRight={(cardIndex) => {
          swipeRight(cardIndex);
        }}
        onSwipedLeft={(cardIndex) => {
          swipeLeft(cardIndex);
        }}
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
        renderCard={(card) =>
          card ? (
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
                  <Text className="text-xl font-bold">{card.displayName}</Text>
                  <Text>{card.job}</Text>
                </View>
                <Text className="text-xl font-bold">{card.age}</Text>
              </View>
            </View>
          ) : (
            <View
              style={styles.cardShadow}
              className="relative h-3/4 items-center justify-center space-y-4 rounded-xl bg-white"
            >
              <Image
                resizeMode="contain"
                className="h-20 w-full"
                source={{ uri: "https://links.papareact.com/6gb" }}
              />
              <View className=" items-center">
                <Text className="text-2xl font-medium">
                  No more bitches for you
                </Text>
                <Text className="text-xl">Try again later</Text>
              </View>
            </View>
          )
        }
      />
    </View>
  );
};

export default CardDeck;

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
