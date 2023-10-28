import { View, SafeAreaView } from "react-native";
import { useRef } from "react";
import Header from "../components/Header";
import CardDeck from "../components/CardDeck";
import PassButton from "../components/ui/button/PassButton";
import SmashButton from "../components/ui/button/SmashButton";

const Home = ({ navigation }: any) => {
  const swipeRef = useRef<any | null>(null);

  return (
    <SafeAreaView className="flex-1">
      <Header navigation={navigation} />
      <CardDeck swipeRef={swipeRef} />

      <View className="flex-1 flex-row items-center justify-evenly">
        <PassButton onPress={() => swipeRef.current?.swipeLeft()} />
        <SmashButton onPress={() => swipeRef.current?.swipeRight()} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
