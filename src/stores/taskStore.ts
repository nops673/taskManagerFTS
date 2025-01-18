import { create } from 'zustand';
import { ETaskPriority, ETaskStatus, Task } from '../types/Task';

export interface TaskStore {
  tasks: Task[];
  filter: TaskFilter;
  editingTask: Task | null;
  isModalOpen: boolean;
  addTask: (task: Task) => void;
  updateTask: (id: number, task: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  setFilter: (filter: Partial<TaskFilter>) => void;
  setEditingTask: (task: Task | null) => void;
  setIsModalOpen: (open: boolean) => void;
  getTasks: () => Task[];
  loading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

interface TaskFilter {
  search?: string;
  status?: ETaskStatus | null;
  priority?: ETaskPriority | null;
  sortBy?: 'createdAsc' | 'createdDesc' | 'dueAsc' | 'dueDesc';
}

const filterTasks = (tasks: Task[], filter: TaskFilter) => {
  return tasks.filter(task => {
    if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase())) {
      return false;
    }
    if (filter.status && task.status !== filter.status) {
      return false;
    }
    if (filter.priority && task.priority !== filter.priority) {
      return false;
    }
    return true;
  });
};

const sortTasks = (tasks: Task[], sortBy?: string) => {
  if (!sortBy) return tasks;

  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'createdAsc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'createdDesc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'dueAsc':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'dueDesc':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      default:
        return 0;
    }
  });
};

const generateNewTaskId = (tasks: Task[]): number => {
  return tasks.length ? Math.max(...tasks.map(t => t.id!)) + 1 : 1; //INFO: Esse increment deve ser feito pelo banco de dados;
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filter: {
    status: null,
    priority: null,
    search: '',
    sortBy: 'createdAsc',
  },
  editingTask: null,
  isModalOpen: false,
  loading: false,
  error: null,

  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),

  addTask: (newTask: Task) => set((state) => ({
    tasks: [...state.tasks, {
      ...newTask,
      id: newTask.id ?? generateNewTaskId(state.tasks)
    }]
  })),

  updateTask: (id: number, updatedTask: Partial<Task>) => set((state) => ({
    tasks: state.tasks.map((task) => 
      task.id === id ? { ...task, ...updatedTask } : task
    )
  })),

  deleteTask: (id: number) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id)
  })),

  setFilter: (newFilter: Partial<TaskFilter>) => set((state) => {
    return {
      filter: { ...state.filter, ...newFilter }
    }
  }),

  getTasks: () => {
    const state = get();
    const filteredTasks = filterTasks(state.tasks, state.filter);
    return sortTasks(filteredTasks, state.filter.sortBy);
  },

  setEditingTask: (task: Task | null) => set({ editingTask: task }),
  setIsModalOpen: (open: boolean) => set({ isModalOpen: open })
})); 