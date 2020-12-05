import React from 'react';
import {
    View, Button,
    TextInput,
    Text,
    StyleSheet,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { globalStyles } from "../styles/global";
import FlatButton from "../shared/button";

const reviewSchema = yup.object({
    title: yup.string().required().min(4),
    body: yup.string().required().min(8),
    rating: yup.string().required().test('is-num-1-5', 'Rating must be a number 1 -5', (val) => {
        return parseInt(val) < 6 && parseInt(val) > 0;
    })
});

const reviewForm = ({ addReview }) => {
    return <View style={globalStyles.container}>
        <Formik
            initialValues={{ title: '', body: '', rating: '' }}
            validationSchema={reviewSchema}
            onSubmit={(values, actions) => {
                actions.resetForm();
                addReview(values);
            }}
        >
            {(props) => {
                const { handleChange, values, handleSubmit, handleBlur, errors } = props;
                return <View>
                    <TextInput
                        style={globalStyles.input}
                        placeholder='Review title'
                        onChangeText={handleChange('title')}
                        value={values.title}
                        onBlur={handleBlur('title')}
                    />
                    {
                        props.touched.title && <Text style={globalStyles.errorText}>{errors.title}</Text>

                    }
                    <TextInput
                        multiline 
                        minHeight={60}
                        style={globalStyles.input}
                        placeholder='Review body'
                        onChangeText={handleChange('body')}
                        value={values.body}
                        onBlur={handleBlur('body')}
                    />
                    {
                        props.touched.body && <Text style={globalStyles.errorText}>{errors.body}</Text>

                    }

                    <TextInput
                        style={globalStyles.input}
                        placeholder='Review (1-5)'
                        onChangeText={handleChange('rating')}
                        value={values.rating}
                        keyboardType="numeric"
                        onBlur={handleBlur('rating')}
                    />
                    {
                        props.touched.rating && <Text style={globalStyles.errorText}>{errors.rating}</Text>

                    }
                   {/*  <Button
                        title="Submit"
                        color="maroon"
                        onPress={handleSubmit}
                    /> */}

                    <FlatButton buttonText='Submit' onPress={handleSubmit}/>
                </View>


            }}
        </Formik>

    </View>
};
const styles = StyleSheet.create({

})
export default reviewForm;