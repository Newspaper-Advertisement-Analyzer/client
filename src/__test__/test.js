import { Box, Input, Typography } from "@mui/material";
import React from "react";

export default function Test() {
  return (
    <div>
      <Typography mt={10} mb={10} variant="h2" textAlign="center">
        Still in progress of Implementation
      </Typography>
      <Box mb={2}>
        <Input type="email" label="Email" fullWidth />
      </Box>
    </div>
  );
}
