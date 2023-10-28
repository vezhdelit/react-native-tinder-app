import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "nativewind";

import { StatusBar } from "react-native";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import SignUp from "../screens/SignUp";
import Chat from "../screens/Chat";
import Modal from "../screens/Modal";

const Stack = createStackNavigator();

const SignedInLayout = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Group>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Group>

      <Stack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <Stack.Screen name="Modal" component={Modal} />
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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
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
