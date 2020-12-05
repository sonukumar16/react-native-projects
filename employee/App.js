import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from "expo-constants"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from "redux";
import { Provider } from "react-redux";

import Home from './screens/Home';
import AddEmployee from './screens/AddEmployee';
import Profile from './screens/Profile';
import { reducer } from "./reducer";

const store = createStore(reducer);
const Stack = createStackNavigator();
const options = {
  title: "Home",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: "#006aff"
  }
};

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ ...options }}
        />
        <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ ...options, title: "Add new employee", }}
        />
        <Stack.Screen name="Profile" component={Profile} options={{ ...options, title: "Profile", }} />
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return <Provider store={store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
  </Provider>

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    //marginTop: Constants.statusBarHeight
  },
});
