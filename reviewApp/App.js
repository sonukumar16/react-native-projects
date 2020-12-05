import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { StatusBar, View, Platform } from 'react-native'
import Navigator from "./routes";

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  return <>
    <View style={{ height: STATUSBAR_HEIGHT }}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="orange" translucent ></StatusBar>
    </View>
    {fontsLoaded ? <Navigator /> : <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
    />}

  </>

}