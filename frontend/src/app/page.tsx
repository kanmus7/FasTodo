"use client";

import { Box, Container, Typography } from "@mui/material";
import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #e3f2fd, #fce4ec)",
          paddingBottom: 8,
        }}
      >
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h1" gutterBottom fontWeight="bold">
            Organize your life with FasTodo
          </Typography>
          <Typography variant="h6" color="text.secondary">
            A minimal task manager built with NestJS and Next.js to help you
            stay focused, plan ahead, and get things done.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
