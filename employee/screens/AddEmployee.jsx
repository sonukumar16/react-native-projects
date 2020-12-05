import React, { useState } from 'react';
import { View, StyleSheet, Modal, Alert, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { useSelector, useDispatch } from 'react-redux';

function AddEmployee(props) {
    const { navigation, route = {} } = props;
    const { params: { employee = {}, employeeIndex } = {} } = route;
    const [name, setName] = useState(employee.name || '');
    const [phone, setPhone] = useState(employee.phone || '');
    const [email, setEmail] = useState(employee.email || '');
    const [salary, setSalary] = useState(employee.salary || '');
    const [picture, setPicture] = useState(employee.picture || '');
    const [position, setPosition] = useState(employee.position || '');
    const [modal, setModal] = useState(false);
    const [enableShift, setEnableShift] = useState(false);
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state);
    const [imageLoading, setImageLoading] = useState(false);

    const pickFromGallery = async () => {

        const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (granted) {
            
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                let newFile = {
                    uri: result.uri,
                    type: `$test/${result.uri.split('.')[1]}`,
                    name: `$test/${result.uri.split('.')[1]}`
                };
                setImageLoading(true);
                handleUpload(newFile);
            }
        } else {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
    };

    const pickFromCamera = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync();
        if (granted) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                let newFile = {
                    uri: result.uri,
                    type: `$test/${result.uri.split('.')[1]}`,
                    name: `$test/${result.uri.split('.')[1]}`
                };
                setImageLoading(true);
                handleUpload(newFile);
            }
        } else {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
    };

    const handleUpload = async (image) => {
        const data = new FormData();
        data.append('file', image)
        data.append("upload_preset", 'employeeApp')
        data.append('cloud_name', 'mikedev');

        try {
            const response = await axios({
                method: 'post',
                url: 'https://api.cloudinary.com/v1_1/mikedev/image/upload',
                data,
                headers: { 'Content-Type': 'multipart/form-data' }
            }
            );
            setPicture(response.data.url);
            setModal(false);
        } catch (error) {
            console.log("Error handling------>>", error);
        }
        setImageLoading(false)
    };

    const submitData = async () => {
        try {
            dispatch({ type: "ADDING_EMPLOYEE" });
            const response = await axios.post("http://192.168.99.251:3000/send-data", {
                name, email, salary, position, picture, phone
            });
            dispatch({ type: "ADDED_EMPLOYEE", payload: response.data });
            Alert.alert(`${response.data.name} is saved successfuly.`);
            if (!loading)
                navigation.navigate('Home');
        } catch (error) {
            console.log("send data api error--->>", error);
        }
    }

    const updateData = async () => {
        try {
            dispatch({ type: "UPDATING_EMPLOYEE" });
            const response = await axios.post("http://192.168.99.251:3000/update", {
                name, email, salary, position, picture, phone, id: employee._id,
            });
            dispatch({ type: "UPDATED_EMPLOYEE", payload: response.data, index: employeeIndex });
            Alert.alert(`${response.data.name} is updated successfuly.`);
            if (!loading)
                navigation.navigate('Home');
        } catch (error) {
            console.log("update data api error--->>", error);
        }
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled={enableShift} style={styles.root}>
            <View>
                <TextInput
                    label="Name"
                    style={styles.inputStyle}
                    theme={theme}
                    value={name}
                    mode="outlined"
                    onFocus={() => setEnableShift(false)}
                    onChangeText={text => setName(text)}
                />
                <TextInput
                    label="Email"
                    style={styles.inputStyle}
                    theme={theme}
                    value={email}
                    mode="outlined"
                    onFocus={() => setEnableShift(false)}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    label="Phone"
                    style={styles.inputStyle}
                    theme={theme}
                    value={phone}
                    mode="outlined"
                    onFocus={() => setEnableShift(false)}
                    keyboardType="number-pad"
                    onChangeText={text => setPhone(text)}
                />
                <TextInput
                    label="Salary"
                    style={styles.inputStyle}
                    theme={theme}
                    value={salary}
                    mode="outlined"
                    onFocus={() => setEnableShift(true)}
                    onChangeText={text => setSalary(text)}
                />
                <TextInput
                    label="Department"
                    style={styles.inputStyle}
                    theme={theme}
                    value={position}
                    mode="outlined"
                    onFocus={() => setEnableShift(true)}
                    onChangeText={text => setPosition(text)}
                />
                <Button icon={picture ? "check" : "upload"}
                    style={styles.inputStyle}
                    mode="contained"
                    theme={theme}
                    loading={loading || imageLoading}
                    onPress={() => setModal(true)}>
                    Upload Image
            </Button>

                <Button icon="content-save"
                    style={styles.inputStyle}
                    disabled={imageLoading}
                    mode="contained"
                    loading={loading}
                    theme={theme}
                    onPress={isEmpty(employee) ? submitData : updateData}>
                    Save
            </Button>
                <Modal
                    visible={modal}
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    style={styles.modal}
                    onRequestClose={() => setModal(fale)}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button icon="camera" theme={theme} mode="contained" onPress={pickFromCamera}>
                                Camera
                     </Button>
                            <Button icon="image-area"
                                theme={theme}
                                mode="contained"
                                onPress={pickFromGallery}>
                                Gallery
                     </Button>
                        </View>
                        <Button theme={theme} onPress={() => setModal(false)}>
                            Cancel
                     </Button>
                    </View>
                </Modal>

            </View>
        </KeyboardAvoidingView>
    );
}

const theme = {
    colors: {
        primary: "#006aff"
    }
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    inputStyle: {
        margin: 5,
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    modal: {
        margin: 20
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        marginBottom: 20,
        backgroundColor: "white"
    }
})
export default AddEmployee;