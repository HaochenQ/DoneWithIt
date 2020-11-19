import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { Image } from "react-native-expo-image-cache";
import ImageSlider from "./ImageSlider";

export default function Card({
  title,
  subTitile,
  imageUrl,
  images,
  onPress,
  thumbailUrl,
}) {
  return (
    <View style={styles.card}>
      <ImageSlider images={images} />
      {/* <Image
        style={styles.image}
        uri={imageUrl}
        tint="light"
        preview={{ uri: thumbailUrl }}
      /> */}
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.subTitile} numberOfLines={2}>
            {subTitile}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
    alignItems: "center",
  },
  detailsContainer: {
    alignSelf: "baseline",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
  },
  subTitile: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: { marginBottom: 7 },
});
