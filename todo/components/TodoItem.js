import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TodoItem = ({ item, pressHandler }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => pressHandler(item.key)}>
        <View style={styles.item}>
          <MaterialIcons name="delete" size={18} color="black" />
          <Text style={styles.textItem}>{item.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    flexDirection: "row",
  },
  textItem: {
    marginLeft: 10,
  },
});
export default TodoItem;
