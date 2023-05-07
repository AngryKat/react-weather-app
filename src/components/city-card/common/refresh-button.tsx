import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const RefreshButton = ({ onRefresh }: { onRefresh: () => void }) => (
  <Button endIcon={<RefreshIcon />} onClick={onRefresh}>
    Refresh
  </Button>
);

export default RefreshButton;
