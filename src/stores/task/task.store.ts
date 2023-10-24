import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from 'uuid'
import { Task, TaskStatus } from "../../interfaces"

interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  addTask: (title: string, status: TaskStatus) => void;
  changeTaskStatus: (id: string, status: TaskStatus) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  onTaskDrop: (status: TaskStatus) => void;
  removeDraggingTaskId: () => void;
  setDraggingTaskId: (id: string) => void;
}

const storeAPI: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/immer", never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
  },
  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status }

    //? With immer (zustand middleware)
    set(state => {
      state.tasks[newTask.id] = newTask;
    });

    //? Require npm install immer
    // set(produce((state: TaskState) => {
    //   state.tasks[newTask.id] = newTask;
    // }))

    //? Without immer (zustand native)
    // set(state => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask
    //   }
    // }))

  },
  changeTaskStatus: (id: string, status: TaskStatus) => {
    set(state => {
      state.tasks[id] = {
        ...state.tasks[id],
        status
      };
    })
  },
  getTasksByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter((task) => task.status === status)
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (taskId) {
      get().changeTaskStatus(taskId, status);
      get().removeDraggingTaskId();
    }
  },
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),
  setDraggingTaskId: (id: string) => set({ draggingTaskId: id }),

})

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      immer(
        storeAPI
      ), { name: 'taskStore' }
    )
  )
)