import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  CardHeader,
  IconButton,
  Divider,
  Skeleton,
  Box,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ClearIcon from "@mui/icons-material/Clear";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshButton from "./refresh-button";

export const CityWeatherInfoSkeleton = ({
  showDetailedInfo = false,
}: {
  showDetailedInfo?: boolean;
}) => (
  <Stack p={1} spacing={4}>
    <Grid container>
      <Grid item>
        <Stack direction="row" spacing={1}>
          <Skeleton width={60} height={60} variant="rectangular" />
          <div>
            <Skeleton width={120} height={40} />
            <Skeleton width={120} height={20} />
          </div>
        </Stack>
      </Grid>
    </Grid>
    <Grid container spacing={2}>
      <Grid item>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item>
        <Stack spacing={0.5}>
          <Skeleton width={110} height={24} />
          <Skeleton width={110} height={24} />
        </Stack>
      </Grid>
      <Grid item>
        <Stack spacing={0.5}>
          <Skeleton width={110} height={24} />
          <Skeleton width={110} height={24} />
        </Stack>
      </Grid>
      {showDetailedInfo && (
        <>
          <Grid item>
            <Stack spacing={0.5}>
              <Skeleton width={110} height={24} />
              <Skeleton width={110} height={24} />
            </Stack>
          </Grid>
          <Grid item>
            <Stack spacing={0.5}>
              <Skeleton width={110} height={24} />
              <Skeleton width={110} height={24} />
            </Stack>
          </Grid>
        </>
      )}
      <Grid item />
    </Grid>
  </Stack>
);

const CityCardSkeleton = ({ gridCard = false }: { gridCard?: boolean }) => {
  return (
    <Card sx={{ width: gridCard ? 360 : 720 }} data-testid="city-card-skeleton">
      <CardHeader
        sx={{
          backgroundColor: "#ffa733",
          padding: "1rem 2rem",
          color: "#ffffff",
        }}
        title={<Skeleton width={150} height={28} />}
        subheader={<Skeleton width={120} height={24} />}
        action={
          <>
            <RefreshButton onRefresh={() => {}} />
            {gridCard && (
              <IconButton aria-label="remove">
                <ClearIcon />
              </IconButton>
            )}
          </>
        }
      />
      <CardContent>
        <Box p={1}>
          <CityWeatherInfoSkeleton showDetailedInfo={!gridCard} />
        </Box>
      </CardContent>
      <CardActions>
        {gridCard ? (
          <Button size="small" endIcon={<ArrowForwardIcon />}>
            Details
          </Button>
        ) : (
          <Button size="small" startIcon={<ArrowBackIcon />}>
            Return
          </Button>
        )}
        <Button endIcon={<RefreshIcon />}>Refresh</Button>
      </CardActions>
    </Card>
  );
};

export default CityCardSkeleton;
