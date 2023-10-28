import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import GoogleSignIn from "../components/ui/button/GoogleSignInButton";
import CustomButton from "../components/ui/button/CustomButton";
import CustomInput from "../components/ui/input/CustomInput";

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<Boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<Boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoadingAuth(true);
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setIsLoadingAuth(false);
    });
  }, []);

  const signIn = async () => {
    setIsLoadingSubmit(true);
    try {
      const response = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log(response);
    } catch (error: any) {
      console.log(error);
      alert("Sign in failed: " + error.message);
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  if (isLoadingAuth) {
    return (
      <View className="flex-1 items-center justify-center dark:bg-neutral-900">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View className="flex-1 items-center justify-center space-y-4 p-8 pb-20 dark:bg-neutral-900">
      <Text className=" text-center text-2xl font-bold dark:text-white">
        Welcome to the TinderApp
      </Text>

      <View className="w-full">
        <GoogleSignIn FIREBASE_AUTH={FIREBASE_AUTH} />
      </View>
      <Text className=" text-base text-gray-500"> or</Text>
      <View className="w-full space-y-4">
        <View>
          <CustomInput
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            placeholderText="Email.."
          />
        </View>
        <View>
          <CustomInput
            value={password}
            onChangeText={(text: string) => setPassword(text)}
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
              title="Login"
              isDisabled={!(email && password)}
              onPress={signIn}
            />
            <CustomButton
              containerClassname=" bg-transparent"
              textClassname=" text-blue-500 font-normal"
              onPress={() => navigation.navigate("SignUp")}
              title="Don't have an account? Create one!"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Login;
