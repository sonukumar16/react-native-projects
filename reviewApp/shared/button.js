import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

const FlatButton = ({ buttonText, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    )

};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        backgroundColor: "#f01d71",
        paddingHorizontal: 10,
        paddingVertical: 14,
        marginTop: 5
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: "white",
        textTransform: 'uppercase'
    }

});

export default FlatButton;