
import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback,Keyboard, View, FlatList, Alert } from "react-native";

import TodoItem from "./components/TodoItem";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";

export default function App() {
  const [todos, setTodos] = useState([
    {
      text: "Coffee",
      key: 1,
    },
    {
      text: "Tea",
      key: 2,
    },
    {
      text: "Milk",
      key: 3,
    },
    {
      text: "Water",
      key: 4,
    },
  ]);

  const addTodoHandler = (text) => {
    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [{ text, key: Math.random().toString() }, ...prevTodos];
      });
    } else {
      Alert.alert("OOPS!", "Todos must be over 3 chars long", [
        { text: "Understood", onPress: () => console.log("Alert closed") }
      ]);
    }
  };
  const pressHandler = (key) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.key != key));
  };

  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
      console.log("dismissed keyboard!");
    }}>
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddTodo addTodoHandler={addTodoHandler}></AddTodo>
        <View style={styles.list}>
          <FlatList
            keyExtractor={(item) => item.key.toString()}
            data={todos}
            renderItem={({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
  },
  content: {
    flex:1,
    backgroundColor:"pink",
    padding: 40,
  },
  list: {
    flex:1,
    backgroundColor:"orange",
    marginTop: 20,
  },
});
