import { create } from "zustand";
import { TaskStorage } from "../services/tasksStorage";
import { Task } from "../types/task";

type TaskState = {
  tasks: Task[];
  load: () => Promise<void>;
  add: (title: string) => Promise<void>;
  toggle: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
};

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],

  load: async () => {
    const tasks = await TaskStorage.get();
    set({ tasks });
  },

  add: async (title) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: Date.now(),
    };

    const updated = [...get().tasks, newTask];

    set({ tasks: updated });
    await TaskStorage.set(updated);
  },

  toggle: async (id) => {
    const updated = get().tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );

    set({ tasks: updated });
    await TaskStorage.set(updated);
  },

  remove: async (id) => {
    const updated = get().tasks.filter((t) => t.id !== id);

    set({ tasks: updated });
    await TaskStorage.set(updated);
  },
}));
