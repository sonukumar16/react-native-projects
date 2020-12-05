import React,{useState} from "react";
import { StyleSheet, Button, View, TextInput } from "react-native";

const AddTodo = ({addTodoHandler}) => {
    const [text, setText] = useState('');

    const changeHandler = (val)=>{
        setText(val);
    }

  return (
    <View >
      <TextInput 
      style={style.input}
      placeholder= 'new todo...'
      onChangeText={changeHandler}
      value={text} 
      />
      <Button 
      onPress= {()=> {
          addTodoHandler(text);
        setText('');

      }} 
      title="Add Todo"
      color='coral'
    
      />
    </View>
  );
};

const style = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
export default AddTodo;
