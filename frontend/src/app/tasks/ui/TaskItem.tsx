"use client";

import {
  Box,
  Paper,
  Typography,
  Stack,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

type Props = {
  task: {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: string;
  };
  onDelete: (id: string) => void;
  onEdit: (task: Props["task"]) => void;
};

const TaskItem = ({ task, onDelete, onEdit }: Props) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleConfirmDelete = () => {
    onDelete(task._id);
    setOpenConfirm(false);
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {task.title}
          </Typography>
          {task.description && (
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          )}
          <Typography
            variant="caption"
            color={task.completed ? "success.main" : "warning.main"}
          >
            {task.completed ? "Completed" : "Pending"}
          </Typography>

          <Typography variant="caption" display="block" color="text.secondary">
            Created at: {formatDate(task.createdAt)}
          </Typography>
        </Box>

        <Stack direction="row" gap={1}>
          <IconButton color="primary" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setOpenConfirm(true)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Paper>
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete <strong>{task.title}</strong>? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskItem;
