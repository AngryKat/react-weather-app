import { Box, Typography } from "@mui/material";

export const BoldFieldValueText = ({
  fieldName,
  fieldValue,
  fieldProps,
}: {
  fieldName: number | string;
  fieldValue: number | string;
  fieldProps?: React.ComponentProps<typeof Typography>;
}) => (
  <Box sx={{ display: "flex", gap: 1 }}>
    <Typography variant="subtitle1" {...fieldProps} sx={{ fontWeight: "bold" }}>
      {fieldName}:
    </Typography>
    <Typography display="inline">{fieldValue}</Typography>
  </Box>
);
