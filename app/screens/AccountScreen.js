import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";

import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";

import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";

export default function AccountScreen({ navigation }) {
  const menuList = [
    {
      title: "My listings",
      onPress: null,
      icon: { name: "format-list-bulleted", backgroundColor: colors.primary },
    },
    {
      title: "My messages",
      onPress: () => navigation.navigate(routes.MESSAGES),
      icon: { name: "email", backgroundColor: colors.secondary },
    },
  ];

  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/default2.png")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuList}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              onPress={item.onPress}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
