import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import colors from "../config/colors";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import logger from "../utility/logger";

export default function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermison();
  }, []);

  const requestPermison = async () => {
    // const result= Permissions.askAsync(Permissions.CAMERA_ROLL)
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) alert("Permisson needed to access the library.");
  };

  const handlePress = async () => {
    if (!imageUri) selectImage();
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      { text: "No" },
      { text: "Yes", onPress: () => onChangeImage(null) },
    ]);
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      logger.log("Error reading an image.");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.medium}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
    // <>
    //   {imageUri ? (
    //     <Image source={{ uri: imageUri }} style={styles.container} />
    //   ) : (
    //     <TouchableOpacity onPress={handlePress}>
    //       <View style={styles.container}>
    //         <MaterialCommunityIcons
    //           color={colors.medium}
    //           name="camera"
    //           size={40}
    //         />
    //       </View>
    //     </TouchableOpacity>
    //   )}
    // </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
  },
});
