import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import GoogleSignIn from "../components/ui/button/GoogleSignInButton";
import CustomInput from "../components/ui/input/CustomInput";
import CustomButton from "../components/ui/button/CustomButton";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<Boolean>(false);

  const signUp = async () => {
    setIsLoadingSubmit(true);

    try {
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log(response);
      alert("Success. Your account is created!");
    } catch (error: any) {
      console.log(error);
      alert("Registratio failed: " + error.message);
    } finally {
      setIsLoadingSubmit(false);
    }
  };
  return (
    <View className="flex-1 items-center justify-center gap-4 p-8 pb-20 dark:bg-neutral-900">
      <Text className=" text-center text-2xl font-bold dark:text-white">
        Create your account!
      </Text>
      <View className="w-full">
        <GoogleSignIn FIREBASE_AUTH={FIREBASE_AUTH} />
      </View>
      <Text className=" text-base text-gray-500"> or</Text>
      <View className="w-full space-y-4">
        <View>
          <CustomInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderText="Email.."
          />
        </View>
        <View>
          <CustomInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderText="Password.."
            isSecureTextEntry
            isShowToggle
          />
        </View>
        {isLoadingSubmit ? (
          <ActivityIndicator size="large" />
        ) : (
          <View className="w-full">
            <CustomButton
              title="SignUp"
              isDisabled={!(email && password)}
              onPress={signUp}
            />
            <CustomButton
              containerClassname=" bg-transparent"
              textClassname=" text-blue-500 font-normal"
              onPress={() => navigation.navigate("Login")}
              title="Already have an accout? Sing in!"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SignUp;
