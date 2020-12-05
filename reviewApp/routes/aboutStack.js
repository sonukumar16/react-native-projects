
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import About from "../screens/About";
import Header from '../shared/header';

const Stack = createStackNavigator();

export default Navigation = (props) => {
    const { navigation } = props
    return <Stack.Navigator screenOptions={{
        headerStyle: {
            //backgroundColor: "orange",
            height: 80,
        },
        headerTintColor: "#444"
    }}>
        <Stack.Screen name="About" options={{
            headerTitle: () => <Header navigation={navigation} title='About GameZone' />,
            headerTitleAlign: 'left',
        }}>
            {
                props => <About  {...props} extraData={{ extraData: "can send additional data" }} />
            }
        </Stack.Screen>

    </Stack.Navigator>
}