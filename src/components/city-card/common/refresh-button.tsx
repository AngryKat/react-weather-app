import { IconButton } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const RefreshButton = ({ onRefresh }: { onRefresh: () => void }) => (
  <IconButton  onClick={onRefresh}>
    <RefreshIcon />
  </IconButton>
);

export default RefreshButton;
