"use client";

import {
  Typography,
  Container,
  Stack,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TaskList from "./ui/TaskList";
import TaskForm from "./ui/TaskForm";
import { useSnackbar } from "../components/SnackbarContext";

type Task = {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const [openForm, setOpenForm] = useState(false);
  const router = useRouter();
  const { showMessage } = useSnackbar();

  const fetchTasks = async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return;

    try {
      const res = await fetch("http://localhost:4000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (task: {
    title: string;
    description: string;
  }) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return;

    try {
      const res = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (res.ok) {
        showMessage("Task created successfully", "success");
        fetchTasks();
      }
    } catch (error) {
      console.error("Error adding task:", error);
      showMessage("Error adding task", "error");
    }
  };

  const handleDeleteTask = async (id: string) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return;

    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(tasks.filter((task) => task._id !== id));
      showMessage("Task deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      showMessage("Error deleting task", "error");
    }
  };

  useEffect(() => {
    fetchTasks();

    const payload = document.cookie
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (payload) {
      const [, payloadPart] = payload.split(".");
      const decoded = JSON.parse(atob(payloadPart));
      setUserEmail(decoded.email);
    }
  }, []);

  useEffect(() => {
    const hasToken = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("token="));
    if (!hasToken) {
      router.push("/");
    }
  }, [router]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Stack direction="row" alignItems="center" gap={2} mb={2}>
        <ChecklistIcon />
        <Typography variant="h4" fontWeight="bold">
          Your Tasks
        </Typography>
      </Stack>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Logged in as:
        </Typography>
        <Typography variant="h6">{userEmail}</Typography>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Task List</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenForm(true)}
          >
            Add Task
          </Button>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <TaskList tasks={tasks} onDelete={handleDeleteTask} onEdit={() => {}} />
      </Paper>
      <TaskForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleAddTask}
      />
    </Container>
  );
};

export default Tasks;
