import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import UserCard from "./ui/card/UserCard";
import PlaceholderCard from "./ui/card/PlaceholderCard";
import { generateId } from "../../utils";

interface Profile {
  id: string;
  displayName?: string;
  job?: string;
  photoURL?: string;
  age?: number;
}

const CardDeck = ({ navigation, swipeRef }: any) => {
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
      doc(FIRESTORE_DB, "users", user?.uid || "", "passes", userSwiped.id),
      userSwiped
    );
  };

  const swipeRight = async (cardIndex: number) => {
    if (!profiles[cardIndex]) return;
    const userSwiped = profiles[cardIndex];
    const loggedInUser = await (
      await getDoc(doc(FIRESTORE_DB, "users", user?.uid || ""))
    ).data();

    getDoc(
      doc(FIRESTORE_DB, "users", userSwiped.id, "matches", user?.uid || "")
    ).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        //user has matched with you before you matched them
        setDoc(
          doc(FIRESTORE_DB, "users", user?.uid || "", "matches", userSwiped.id),
          userSwiped
        );

        //Create a MATCH!
        setDoc(
          doc(FIRESTORE_DB, "matches", generateId(user?.uid, userSwiped.id)),
          {
            users: {
              [user?.uid || ""]: loggedInUser,
              [userSwiped.id]: userSwiped,
            },
            usersMathced: [user?.uid, userSwiped.id],
            createdAt: serverTimestamp(),
          }
        );

        navigation.navigate("Match", { loggedInUser, userSwiped });
      } else {
        //user has wiped first or didnt get swiped on..
        setDoc(
          doc(FIRESTORE_DB, "users", user?.uid || "", "matches", userSwiped.id),
          userSwiped
        );
      }
    });
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
          card ? <UserCard card={card} /> : <PlaceholderCard />
        }
      />
    </View>
  );
};

export default CardDeck;
