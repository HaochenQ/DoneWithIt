import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Text } from "react-native";
import { Image } from "react-native-expo-image-cache";

const width = Dimensions.get("window").width;
const height = 0.6 * width;
export default function ImageSlider({ images }) {
  //   const images = [
  //     "https://images.pexels.com/photos/38537/woodland-road-falling-leaf-natural-38537.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //     "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //     "https://images.pexels.com/photos/364096/pexels-photo-364096.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  //     "https://images.pexels.com/photos/255441/pexels-photo-255441.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //   ];

  const [active, setActive] = useState(0);

  const scrollRef = React.createRef();

  const handleScroll = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) setActive(slide);
  };

  return (
    <View style={styles.constiner}>
      <ScrollView
        ref={scrollRef}
        onMomentumScrollEnd={handleScroll}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        style={styles.scroll}
        scrollEventThrottle={16}
      >
        {images.map((item, index) => (
          <Image
            key={index}
            style={styles.image}
            uri={item.url}
            preview={{ uri: item.thumbailUrl }}
          />
        ))}
      </ScrollView>
      <View style={styles.indicator}>
        {images.length > 1 &&
          images.map((item, index) => (
            <Text
              key={index}
              style={
                index === active
                  ? styles.indicatorActiveText
                  : styles.indicatorText
              }
            >
              ⬤
            </Text>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  constiner: { width, height },
  scroll: { width, height },
  image: {
    height,
    width,
    resizeMode: "cover",
  },
  indicator: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    alignSelf: "center",
  },
  indicatorText: { fontSize: width / 50, color: "#888", margin: 3 },
  indicatorActiveText: { fontSize: width / 50, color: "#fff", margin: 3 },
});
