import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function header(props) {
    const { title, navigation, ...rest } = props;
    const handleOnPress = () => {
        console.log("icon presss", navigation);
        navigation.openDrawer();
    };

    return (
        <ImageBackground source={require("../assets/images/game_bg.png")} style={styles.header} >
            <MaterialIcons name="menu" size={28} style={styles.icon} onPress={handleOnPress} />
            <View style={styles.headerTitle}>
                <Image source={require("../assets/images/heart_logo.png")} style={styles.headerImage} />
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
    },
    icon: {
        position: 'absolute',
        left: 0,
    },
    headerTitle: {
        flexDirection: "row",
    },
    headerImage: {
        width: 26,
        height: 26,
        marginHorizontal: 10,
    }
})
export default header;