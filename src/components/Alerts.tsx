import { Alert } from "@mui/material";
import React from "react";

interface Message {
  message: string;
}

export default function ErrorAlert(props: Message) {
  return <Alert severity="error">{props.message}</Alert>;
  
}
