"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import Snackbar from "./Snackbar";

type severity = "success" | "error" | "info" | "warning";

type SnackbarContextType = {
  showMessage: (msg: string, severity?: severity) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within SnackbarProvider");
  return context;
};

export function SnackbarProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<severity>("info");

  const showMessage = useCallback((msg: string, type: severity = "info") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  }, []);

  const contextValues = useMemo(() => {
    return {
      showMessage,
    };
  }, [showMessage]);

  return (
    <SnackbarContext.Provider value={contextValues}>
      {children}
      <Snackbar
        open={open}
        message={message}
        severity={severity}
        onClose={() => setOpen(false)}
      />
    </SnackbarContext.Provider>
  );
}
