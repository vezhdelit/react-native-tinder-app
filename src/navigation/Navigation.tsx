import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StatusBar } from "react-native";

import Home from "../screens/Home";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Chat from "../screens/Chat";

const Stack = createNativeStackNavigator();
const SignedInStack = createNativeStackNavigator();
const SignedOutStack = createNativeStackNavigator();

const SignedInLayout = () => {
  return (
    <SignedInStack.Navigator initialRouteName="Home">
      <SignedInStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitleAlign: "center" }}
      />
      <SignedInStack.Screen
        name="Chat"
        component={Chat}
        options={{ headerTitleAlign: "center" }}
      />
    </SignedInStack.Navigator>
  );
};

const SignedOutLayout = () => {
  return (
    <SignedOutStack.Navigator initialRouteName="Login">
      <SignedOutStack.Screen
        name="Login"
        component={Login}
        options={{ headerTitleAlign: "center" }}
      />
      <SignedOutStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitleAlign: "center" }}
      />
    </SignedOutStack.Navigator>
  );
};

const Navigation = () => {
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    setUser(true);
  }, []);
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Stack.Navigator initialRouteName="SignedOutLayout">
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
