import { View, Text, Image, TextInput, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import {
  FIREBASE_APP,
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
  FIRESTORE_DB,
} from "../../firebaseConfig";
import CustomButton from "../components/ui/button/CustomButton";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import UploadImage from "../components/UploadImage";

const EditProfileScreen = ({ navigation }: any) => {
  const user = FIREBASE_AUTH.currentUser;
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const isIncompleteForm = !image || !job || !age;

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const loggedInUser = await (
      await getDoc(doc(FIRESTORE_DB, "users", user?.uid || ""))
    ).data();

    if (loggedInUser) {
      setName(loggedInUser.displayName);
      setImage(loggedInUser.photoURL);
      setJob(loggedInUser.job);
      setAge(loggedInUser.age);
    }
    console.log("USER", loggedInUser);
  };

  const handleUpdateUser = async () => {
    console.log(user?.uid);
    try {
      const dbRef = doc(FIRESTORE_DB, "users", user?.uid || "");

      const res = await setDoc(dbRef, {
        id: user?.uid,
        photoURL: image,
        displayName: name,
        job: job,
        age: age,
        updatedAt: serverTimestamp(),
      });
      console.log("User profile updated successfully.");
      console.log("UPDATED USER", res);
    } catch (error) {
      console.error("Error updating user profile: ", error);
    } finally {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center space-y-4 p-8">
      <Text className=" text-2xl font-bold ">Edit your profile!</Text>

      <View className=" items-center">
        <Text className=" text-lg font-bold text-red-500">
          Step 1: The name
        </Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          className="text-center text-lg"
          placeholder="Enter your name"
        />
      </View>

      <View className=" items-center space-y-2">
        <Text className=" text-lg font-bold text-red-500">
          Step 2: The Profile Pic
        </Text>
        {image && <Image className=" h-72 w-48" source={{ uri: image }} />}
        <View>
          <UploadImage image={image} setImage={setImage} />
        </View>
      </View>

      <View className=" items-center">
        <Text className=" text-lg font-bold text-red-500">Step 3: The Job</Text>
        <TextInput
          value={job}
          onChangeText={(text) => setJob(text)}
          className="text-center text-lg"
          placeholder="Enter your occupation.."
        />
      </View>

      <View className=" items-center">
        <Text className=" text-lg font-bold text-red-500">Step 4: The Age</Text>
        <TextInput
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
          className="text-center text-lg"
          placeholder="Enter your age.."
          maxLength={2}
        />
      </View>
      <View className="w-full px-6">
        <CustomButton
          buttonColor="bg-red-400"
          onPress={() => handleUpdateUser()}
          isDisabled={isIncompleteForm}
          containerClassname=" w-full "
          title="Update profile"
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
