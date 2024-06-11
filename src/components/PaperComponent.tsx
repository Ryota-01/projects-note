import React from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { Subtitles } from "@mui/icons-material";

// Props の型を定義
interface PaperComponentProps {
  title: string;
  subTitle: string;
  children: React.ReactNode;
}

export default function PaperComponent({
  title,
  subTitle,
  children,
}: PaperComponentProps) {
  console.log(subTitle);
  return (
    <>
      <Box
        component={Paper}
        sx={{ width: "72%", margin: "18px auto", padding: "32px" }}
      >
        <Typography variant="h6" mb={2} sx={{ textAlign: "left" }}>
          {title}{subTitle}
        </Typography>
        <Divider />
        {children}
      </Box>
    </>
  );
}
