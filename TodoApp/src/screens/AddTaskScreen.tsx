import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { useTaskStore } from "../storage/taskStore";
import { useAppNavigation } from "../navigation/useAppNavigation";

function AddTaskScreen() {
  const [text, setText] = useState("");
  const navigation = useAppNavigation();
  const add = useTaskStore((s) => s.add);

  const onSave = async () => {
    if (!text.trim()) return;

    await add(text);
    setText("");
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Новая задача"
        style={{
          borderWidth: 1,
          padding: 12,
          borderRadius: 8,
        }}
      />

      <Text
        onPress={onSave}
        style={{
          marginTop: 10,
          backgroundColor: "black",
          color: "white",
          padding: 12,
          textAlign: "center",
          borderRadius: 8,
        }}
      >
        Сохранить
      </Text>
    </View>
  );
}
export default AddTaskScreen;
