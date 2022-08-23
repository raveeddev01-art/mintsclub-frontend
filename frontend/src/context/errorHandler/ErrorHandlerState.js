import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ErrorHandlerContext from "./ErrorHandlerContext";

export default function ErrorHandlerState({ children }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      setError(null);
    }
  }, [error]);
  return (
    <ErrorHandlerContext.Provider value={setError}>
      {children}
    </ErrorHandlerContext.Provider>
  );
}
