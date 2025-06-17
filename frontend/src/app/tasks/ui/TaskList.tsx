"use client";

import { Stack, Typography } from "@mui/material";
import TaskItem from "./TaskItem";

type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
};

const TaskList = ({ tasks, onDelete, onEdit }: Props) => {
  if (tasks.length === 0)
    return <Typography>No tasks found. Create one!</Typography>;
  return (
    <Stack gap={2}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </Stack>
  );
};

export default TaskList;
