import { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from "../types/task";
import { Ionicons } from "@expo/vector-icons";

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

function TaskItem({ task, onDelete, onToggle }: TaskItemProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <View style={[styles.checkbox, task.completed && styles.checked]}>
          {task.completed && <Text style={styles.check}>✓</Text>}
        </View>
      </TouchableOpacity>

      <Text
        style={[styles.title, task.completed && styles.titleDone]}
        numberOfLines={2}
      >
        {task.title}
      </Text>

      <TouchableOpacity
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );
}

export default memo(TaskItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderRadius: 12,

    // тень iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    // тень Android
    elevation: 3,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#111",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  checked: {
    backgroundColor: "#111",
  },

  check: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  title: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#111",
    fontWeight: "500",
  },

  titleDone: {
    textDecorationLine: "line-through",
    color: "#9ca3af",
  },

  deleteButton: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
