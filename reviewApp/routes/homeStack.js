import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReviewDetails from "../screens/ReviewDetails";
import Home from "../screens/Home";
import Header from '../shared/header';
import header from '../shared/header';

const Stack = createStackNavigator();

export default Navigation = (props) => {
    const {navigation} = props
    return   <Stack.Navigator screenOptions={{
            headerStyle: {
               // backgroundColor: "orange",
                height:80,
            },
            headerTintColor:"#444",
        }} >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    title: "Home Screen Title",
                    // headerStyle: {
                    //     backgroundColor: "orange"
                    // },
                    headerTitleAlign:'left',
                    headerTitle: (props) => <Header title='GameZone' {...props} navigation={navigation} />,

                }}
            />
            <Stack.Screen
                name="ReviewDetails"
                component={ReviewDetails}
                options={{ title: "Review Details Screen Title" }}
            />

        </Stack.Navigator>
}