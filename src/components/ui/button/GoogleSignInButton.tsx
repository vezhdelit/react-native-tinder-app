import { View, Text, TouchableOpacity } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Auth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GoogleSignInProps {
  FIREBASE_AUTH: Auth;
}

const GoogleSignIn = ({ FIREBASE_AUTH }: GoogleSignInProps) => {
  GoogleSignin.configure({
    webClientId:
      "133116441410-a81oke3p07i5pptkmhfil2fftstp7f89.apps.googleusercontent.com",
  });

  const signInWithGoogle = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);

      const response = signInWithCredential(FIREBASE_AUTH, googleCredential);
      console.log(response);

      // Makes sure that you can choose an account on every sign in
      await GoogleSignin.revokeAccess();
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={signInWithGoogle}
        className="flex w-full flex-row items-center justify-center space-x-2 rounded-lg bg-red-600 p-4"
      >
        <Ionicons name="logo-google" size={24} color="white" />

        <Text className="text-base font-medium text-white ">
          Sign in with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleSignIn;
