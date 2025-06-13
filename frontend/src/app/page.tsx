"use client";

import {
  Container,
  Box,
  Typography,
  List,
  ListItem,
  Stack,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box component="main" py={4}>
        <Box display="flex" justifyContent="center" mb={4}>
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </Box>

        <Typography variant="h6" gutterBottom>
          Getting Started
        </Typography>
        <List>
          <ListItem>
            <Typography>
              Get started by editing <code>src/app/page.tsx</code>.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography>Save and see your changes instantly.</Typography>
          </ListItem>
        </List>

        <Stack direction="row" spacing={2} mt={4}>
          <Link
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="contained"
              startIcon={
                <Image src="/vercel.svg" alt="Vercel" width={20} height={20} />
              }
            >
              Deploy now
            </Button>
          </Link>

          <Link
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outlined">Read our docs</Button>
          </Link>
        </Stack>
      </Box>

      <Box component="footer" py={4} borderTop={1} mt={6}>
        <Stack direction="row" spacing={4} justifyContent="center">
          <Link
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              startIcon={
                <Image
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                  aria-hidden
                />
              }
            >
              Learn
            </Button>
          </Link>

          <Link
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              startIcon={
                <Image
                  src="/window.svg"
                  alt="Window icon"
                  width={16}
                  height={16}
                  aria-hidden
                />
              }
            >
              Examples
            </Button>
          </Link>

          <Link
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              startIcon={
                <Image
                  src="/globe.svg"
                  alt="Globe icon"
                  width={16}
                  height={16}
                  aria-hidden
                />
              }
            >
              Go to nextjs.org →
            </Button>
          </Link>
        </Stack>
      </Box>
    </Container>
  );
}
