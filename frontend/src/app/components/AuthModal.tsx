"use client";

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SetStateAction, useEffect, useState } from "react";
import { useSnackbar } from "./SnackbarContext";
import { useAuth } from "./AuthContext";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

type Props = {
  open: boolean;
  onClose: () => void;
  type: "login" | "register";
  setModalOpen: (value: SetStateAction<boolean>) => void;
};

export default function AuthModal({
  open,
  onClose,
  type,
  setModalOpen,
}: Readonly<Props>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const { showMessage } = useSnackbar();
  const { login } = useAuth();

  const handleSubmit = async () => {
    const endpoint = type === "register" ? "/auth/register" : "/auth/login";
    const payload =
      type === "register" ? { name, email, password } : { email, password };

    try {
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? "Request failed");
      }

      const data = await res.json();
      if (type === "login") {
        login(data.access_token);
        showMessage("Logged in successfully!", "success");
      } else {
        showMessage("Registered successfully. You can now log in.", "success");
      }
      onClose();
    } catch (error) {
      const err = error as Error;
      console.error("Error:", err.message);
      showMessage(err.message, "error");
    } finally {
      setModalOpen(false);
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    const canSubmit =
      type === "login"
        ? email.trim() && password.trim()
        : name.trim() && email.trim() && password.trim();

    setDisabledButton(!canSubmit);
  }, [type, name, email, password]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="bold">
            {type === "login" ? "Login" : "Create account"}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Stack spacing={2}>
          {type === "register" && (
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={disabledButton}
          >
            {type === "login" ? "Login" : "Register"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
