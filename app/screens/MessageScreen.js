import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../components/lists/ListItem";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";

const initialMessages = [
  {
    id: 1,
    title: "mosh",
    description:
      "Nulla nulla elit ipsum duis minim voluptate. Eu sit sint ullamco sit officia qui. Eiusmod mollit nisi ea eiusmod.",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description:
      "Incididunt voluptate eiusmod eu excepteur aliqua amet. Est eiusmod deserunt Lorem sit id. Sunt officia aliqua sit dolore irure amet adipisicing eiusmod et amet aliquip. Id anim dolor mollit adipisicing.",
    image: require("../assets/lisa.jpeg"),
  },
  {
    id: 3,
    title: "T3",
    description:
      "Ullamco irure ipsum enim anim minim commodo quis nostrud ad anim. Aliquip labore aliqua labore est nostrud proident sint quis. Sint eu officia ea officia ad. Id enim veniam officia occaecat nisi est do amet ullamco. Sunt id consequat mollit consequat occaecat occaecat. Consectetur irure exercitation labore aute adipisicing incididunt adipisicing magna laboris commodo tempor sunt. Pariatur culpa est officia cupidatat cupidatat eiusmod tempor ut.",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 4,
    title: "T4",
    description:
      "Dolor veniam aliquip duis irure laboris nostrud sint reprehenderit ad ut. Commodo amet duis nisi cupidatat eiusmod eu voluptate sint amet tempor do ipsum. Sunt sit elit dolor nostrud elit aute exercitation non eu incididunt aliquip esse. Dolor duis velit nostrud ad dolore.",
    image: require("../assets/mary.jpg"),
  },
];

export default function MessageScreen() {
  const [messages, setMessage] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const handleDelete = (message) => {
    //delete from messages
    setMessage(messages.filter((m) => m.id !== message.id));
    //call the server
  };
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            image={item.image}
            onPress={() => {
              console.log("Message selected", item);
            }}
            renderRightActions={() => (
              <ListItemDeleteAction onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessage(initialMessages);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({});
