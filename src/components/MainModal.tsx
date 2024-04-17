import { type ReactElement, type ReactNode, cloneElement } from "react";
import useToggle from "~/hooks/useToggle";
import { Modal, Box, Button, useMediaQuery, useTheme } from "@mui/material";

function MainModal({
  children,
  buttonLabel,
}: {
  children: ReactNode;
  buttonLabel?: string;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));

  const getModalWidth = () => {
    if (isSmallScreen) {
      return 385;
    } else if (isMediumScreen) {
      return 600;
    } else if (isLargeScreen) {
      return 800;
    } else {
      return "auto"; // Default width for other screen sizes
    }
  };

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: getModalWidth(),
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 20,
    maxHeight: "90vh", // Set a maximum height for the content
    overflowY: "auto",
  };

  const [value, toggleValue] = useToggle();
  const handleOpen = () => toggleValue(true);
  const handleClose = () => toggleValue(false);

  return (
    <Box>
      <Button onClick={handleOpen}>{buttonLabel}</Button>

      <Modal open={value} onClose={handleClose}>
        <Box sx={style}>
          {children && cloneElement(children as ReactElement, { toggleValue })}
        </Box>
      </Modal>
    </Box>
  );
}

export default MainModal;
