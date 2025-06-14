"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AuthModal from "./AuthModal";
import { useState } from "react";

export default function Header() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"login" | "register">("login");

  const handleOpen = (type: "login" | "register") => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: "#333",
        }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              FasTodo
            </Typography>
            <ChecklistIcon sx={{ ml: 1, color: "#ffff" }} />
          </Box>

          <Box display="flex" gap={1}>
            <Button
              sx={{ color: "#ffff" }}
              size="medium"
              onClick={() => handleOpen("login")}
              variant="outlined"
            >
              Login
            </Button>

            <Button
              onClick={() => handleOpen("register")}
              variant="contained"
              size="medium"
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <AuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        setModalOpen={setModalOpen}
      />
    </>
  );
}
