import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface Props {
  isSuccess: boolean;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
}

export default function CustomizedSnackbars(props: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setOpen(props.isSuccess);
  }, []);

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
