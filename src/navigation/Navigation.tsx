import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";

import { StatusBar } from "react-native";

import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import MatchPopUp from "../screens/MatchPopUp";

import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MessagesScreen from "../screens/MessagesScreen";

const Stack = createNativeStackNavigator();

const SignedInLayout = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          animation: "fade_from_bottom",
        }}
      >
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "transparentModal",
          animation: "fade",
        }}
      >
        <Stack.Screen name="Match" component={MatchPopUp} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const SignedOutLayout = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

//root navigation function
const Navigation = () => {
  const [user, setUser] = useState<User | null>(null);
  const { colorScheme } = useColorScheme();

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor={`${colorScheme == "dark" ? "#171717" : "white"}`}
        barStyle={`${colorScheme == "dark" ? "light-content" : "dark-content"}`}
      />
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <Stack.Screen name="SignedInLayout" component={SignedInLayout} />
        ) : (
          <Stack.Screen name="SignedOutLayout" component={SignedOutLayout} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
