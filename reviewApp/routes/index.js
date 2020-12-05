import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, } from "@react-navigation/native";

import HomeScreen from "./homeStack";
import AboutScreen from "./aboutStack";


const Drawer = createDrawerNavigator();
export default function Routes() {
  return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
  )
}