import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/task";

const KEY = "@tasks";

export const TaskStorage = {
  async get(): Promise<Task[]> {
    const data = await AsyncStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  },

  async set(tasks: Task[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(tasks));
  },
};
