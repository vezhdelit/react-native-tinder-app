import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Uploading from "./Uploading";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

import {
  FIREBASE_AUTH,
  FIREBASE_STORAGE,
  FIRESTORE_DB,
} from "../../firebaseConfig";

const UploadImage = ({ image, setImage }: { image: string; setImage: any }) => {
  const [progress, setProgress] = useState<number>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "image");
    }
  };

  const uploadImage = async (uri: string, fileType: any) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(FIREBASE_STORAGE, "media/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(+progress.toFixed());
      },
      (error) => {
        console.log(error);
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          // save record
        });
      }
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={pickImage}
        className="flex flex-row items-center justify-center  space-x-2 rounded-full bg-black px-6 py-4"
      >
        <Ionicons name="image" size={24} color="white" />

        <Text className="text-base text-white ">Set Profile Pic</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadImage;
