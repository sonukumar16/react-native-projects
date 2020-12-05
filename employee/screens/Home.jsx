import React, { useEffect,  } from "react";
import { Text, View, StyleSheet, Image, FlatList, Alert,  } from "react-native";
import { Card, FAB } from "react-native-paper";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const Home = (props) => {
    const { navigation } = props;
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state);
    const fetchData = async () => {
        try {
            dispatch({ type: "FETCHING_EMPLOYEES" }, { loading: true })
            const response = await axios.get("http://192.168.99.251:3000/");
            dispatch({ type: "FETCHED_EMPLOYEES", payload: response.data });
        } catch (error) {
            console.log("api fetch error---", error);
            Alert.alert("Something went wrong!!");
        }
    }

    useEffect(() => {
        fetchData();
    }, [isFocused]);

    const renderItem = (employee, index) => {
        return (
            <Card style={styles.cardContainer} onPress={() => navigation.navigate('Profile', {employee, index})}>
                <View style={styles.cardView}>
                    <Image source={{ uri: employee.picture }} style={styles.image}></Image>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{employee.name}</Text>
                        <Text>{employee.position}</Text>
                    </View>
                </View>
            </Card>
        )
    }
    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item) => item._id}
                data={data}
                renderItem={({ item, index }) => renderItem(item, index)}
                refreshing={loading}
                onRefresh={() => fetchData()}

            />
            <FAB onPress={() => navigation.navigate('AddEmployee')}
                style={styles.fab}
                icon="plus"
                theme={{
                    colors: { accent: 'orange' },
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: 5
    },
    cardContainer: {
        margin: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,

    },
    cardView: {
        padding: 6,
        flexDirection: 'row',
    },
    textContainer: {
        marginLeft: 10
    },
    text: {
        fontSize: 18
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default Home;