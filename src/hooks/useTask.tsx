import React from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface useTaskProps {
  status: TaskStatus;
}

export const useTask = ({ status }: useTaskProps) => {

  const isDragging = useTaskStore(state => state.draggingTaskId);
  const addTask = useTaskStore(state => state.addTask);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);

  const [onDragOver, setOnDragOver] = React.useState(false)

  const handleAddTask = async () => {

    const { isConfirmed, value } = await Swal.fire({
      title: 'New Task',
      input: 'text',
      inputLabel: 'Task Name',
      inputPlaceholder: 'Enter task name',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    })

    if (!isConfirmed) return;
    addTask(value, status);

  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status)
  }

  return {
    isDragging,
    handleAddTask,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    onDragOver,
  }
}