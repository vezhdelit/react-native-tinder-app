import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "nativewind";

import { StatusBar } from "react-native";
import Home from "../screens/Home";
import Login from "../screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import SignUp from "../screens/SignUp";
import Chat from "../screens/Chat";

const Stack = createNativeStackNavigator();

const SignedInLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const SignedOutLayout = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
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
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="SignedInLayout"
            component={SignedInLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="SignedOutLayout"
            component={SignedOutLayout}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
