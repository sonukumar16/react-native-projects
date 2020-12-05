import React from 'react';
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { globalStyles, images } from "../styles/global"
import Card from "../shared/card"

function Review(props) {
    const { navigation, route } = props;
    const { title, body, rating } = route.params;

    return (
        <View style={globalStyles.container}>
            <Card>
                <Text > {title}</Text>
                <Text > {body}</Text>
                <View style={styles.rating}>
                    <Text> GameZone rating: </Text>
                    <Image source={images.rating[rating]} />
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 16,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee"
    }
});

export default Review;