import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import MessageScreen from "../screens/MessageScreen";

const Stack = createStackNavigator();
const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{ headerShown: false }}
      name="Account"
      component={AccountScreen}
    />
    <Stack.Screen
      options={{ headerShown: true }}
      name="Messages"
      component={MessageScreen}
    />
  </Stack.Navigator>
);
export default AccountNavigator;
