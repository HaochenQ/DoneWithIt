import React from "react";
import { StyleSheet, View } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import colors from "../config/colors";
import AppText from "./AppText";
import Constains from "expo-constants";

export default function OfflineNotice() {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText style={styles.text}> No Internet Connection</AppText>
      </View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    top: Constains.statusBarHeight,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: colors.primary,
    height: 45,
    zIndex: 1,
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
});
