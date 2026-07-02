import { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TaskItem from "../components/TaskItem";
import { useTaskStore } from "../storage/taskStore";
import { useAppNavigation } from "../navigation/useAppNavigation";

function HomeScreen() {
  const navigation = useAppNavigation();

  const tasks = useTaskStore((s) => s.tasks);
  const load = useTaskStore((s) => s.load);
  const remove = useTaskStore((s) => s.remove);
  const toggle = useTaskStore((s) => s.toggle);

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Список задач</Text>
        <Text style={styles.subtitle}>Управляй своими задачами</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Пока задач нет</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TaskItem task={item} onDelete={remove} onToggle={toggle} />
        )}
      />

      <View style={styles.footer}>
        <Text
          onPress={() => navigation.navigate("AddTask")}
          style={styles.button}
        >
          + Добавить задачу
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    paddingHorizontal: 16,
  },

  header: {
    paddingBottom: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6b7280",
  },

  list: {
    paddingBottom: 20,
  },

  empty: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
  },

  footer: {
    paddingVertical: 12,
  },

  button: {
    backgroundColor: "#111",
    color: "white",
    padding: 14,
    borderRadius: 12,
    textAlign: "center",
    fontWeight: "600",
  },
});
