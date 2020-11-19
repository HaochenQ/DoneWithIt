import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ListItem from "../components/lists/ListItem";
import AppText from "../components/AppText";
import ContactSellerForm from "../components/ContactSellerForm";
import ImageSlider from "../components/ImageSlider";

export default function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        {/* <Image
          style={styles.image}
          tint="light"
          preview={{ uri: listing.images[0].thumbnailUrl }}
          uri={listing.images[0].url}
        /> */}
        <ImageSlider images={listing.images} />

        <View style={styles.detailesContainer}>
          <AppText style={styles.title}>{listing.title}</AppText>
          <AppText style={styles.price}>${listing.price}</AppText>
          <View style={styles.userContainer}>
            <ListItem
              image={require("../assets/mosh.jpg")}
              title="Mosh Wiliam"
              subTitle="5 Listings"
            />
          </View>
          <ContactSellerForm listing={listing} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 300,
  },
  detailesContainer: {
    backgroundColor: colors.white,
    padding: 20,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});
