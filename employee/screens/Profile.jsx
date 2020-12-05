import React from 'react';
import { Text, View, StyleSheet, Image, Linking, Platform, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';


const Profile = (props) => {
    const { employee, index: employeeIndex } = props.route.params
    const { email, designation, name, phone, salary, picture, _id } = employee;
    const { navigation } = props;

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state);

    const openDail = () => {
        if (Platform.OS == 'android') {
            Linking.openURL(`tel:${phone}`)
        } else {
            Linking.openURL(`telprompt:${phone}`);
        }
    };

    const deleteEmployee = async () => {
        try {
            dispatch({ type: "DELETEING_EMPLOYEE" });
            const response = await axios.post("http://192.168.99.251:3000/delete", { id: _id });
            Alert.alert(`${response.data.name} deleted!`);
            dispatch({ type: "DELETE_EMPLOYEE", payload: response.data })
            if (!loading)
                navigation.navigate("Home");
        } catch (error) {
            console.log("Delete api error---", error);
            Alert.alert("Something went wrong!!");
        }
    };

    return (
        <View style={styles.root}>
            <LinearGradient
                colors={['#0033ff', '#6bc1ff']}
                style={{ height: "20%" }}
            >
            </LinearGradient>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    source={{ uri: picture }}
                />
            </View>
            <View style={styles.desc}>
                <Title>{name}</Title>
                <Text style={styles.designation}>{designation}</Text>
            </View>
            <Card style={styles.detailsCard} onPress={() => Linking.openURL(`mailto:${email}`)}>
                <View style={styles.cardContent}>
                    <MaterialIcons name='email' size={32} color="#006aff" />
                    <Text style={styles.text}>{email}</Text>
                </View>
            </Card>
            <Card style={styles.detailsCard} onPress={openDail}>
                <View style={styles.cardContent}>
                    <Feather name="phone-call" size={32} color="#006aff" />
                    <Text style={styles.text}>{phone}</Text>
                </View>
            </Card>
            <Card style={styles.detailsCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name="attach-money" size={24} color="#006aff" />
                    <Text style={styles.text}>{salary}</Text>
                </View>
            </Card>
            <View style={styles.actionContainer}>
                <Button icon='account-edit' theme={theme} mode="contained" onPress={
                    () => navigation.navigate("AddEmployee", { employee, employeeIndex })
                } >
                    Edit profile
                   </Button>
                <Button icon='delete' theme={theme} mode="contained" onPress={deleteEmployee}>
                    Fire Employee
                   </Button>
            </View>

        </View>
    )
};

const theme = {
    colors: {
        primary: "#006aff"
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,

    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: "center"
    },

    image: {
        width: 140,
        height: 140,
        borderRadius: 70,
        marginTop: -50
    },
    desc: {
        alignItems: 'center',
        margin: 15
    },
    designation: {
        fontSize: 13,
    },
    detailsCard: {
        margin: 5
    },
    cardContent: {
        flexDirection: "row",
        padding: 8,
        marginTop: 10

    },
    text: {
        fontSize: 18,
        // marginTop: 3,
        marginLeft: 5,
    },
    actionContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10
    }
})
export default Profile;