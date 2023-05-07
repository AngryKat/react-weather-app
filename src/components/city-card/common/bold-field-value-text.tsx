import { Typography } from "@mui/material";

export const BoldFieldValueText = ({
  fieldName,
  fieldValue,
  fieldProps,
}: {
  fieldName: number | string;
  fieldValue: number | string;
  fieldProps?: React.ComponentProps<typeof Typography>;
}) => (
  <Typography variant="subtitle1" {...fieldProps} sx={{ fontWeight: "bold" }}>
    {fieldName}: <Typography display="inline">{fieldValue}</Typography>
  </Typography>
);
