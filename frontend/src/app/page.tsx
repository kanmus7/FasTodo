"use client";
import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("token="));
    if (hasToken) {
      router.push("/tasks");
    }
  }, [router]);

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography variant="h1" gutterBottom fontWeight="bold">
        Organize your life with FasTodo
      </Typography>
      <Typography variant="h6" color="text.secondary">
        A minimal task manager built with NestJS and Next.js to help you stay
        focused, plan ahead, and get things done.
      </Typography>
    </Container>
  );
}
