import React from 'react';
import { View, StyleSheet } from "react-native";


const Card = (props) => {
    return <View style={styles.container}>
        <View style={styles.content}>
            {props.children}
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        backgroundColor: '#fff',
        elevation: 3,
        marginVertical: 6,
        marginHorizontal: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    content: {
        marginHorizontal: 18,
        marginVertical: 20,
    }
});

export default Card;
