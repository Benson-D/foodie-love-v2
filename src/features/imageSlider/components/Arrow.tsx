import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box } from "@mui/material";

/** Arrow Icons that handle the direction of Image Slider */
function Arrow({
  direction,
  handleClick,
}: {
  direction: string;
  handleClick: () => void;
}) {
  //CSS Position
  const arrowDirection = direction === "left" ? "left" : "right";
  const arrowPosition = { [arrowDirection]: 7 };

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "absolute",
        cursor: "pointer",
        top: "8rem",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#00000042",
        borderRadius: "50%",
        ...arrowPosition,
        "&:hover": {
          backgroundColor: "#0000008f",
        },
      }}
    >
      {direction === "left" ? (
        <ChevronLeftIcon sx={{ fontSize: "44px" }} />
      ) : (
        <ChevronRightIcon sx={{ fontSize: "44px" }} />
      )}
    </Box>
  );
}

export default Arrow;
