import { Box, Drawer } from "@mui/material";

/**
 * Side modal to display additional information,
 * or serve as nav bar for mobile display
 *
 */
export default function SideModal({
  modalOpen,
  sideWidth = 300,
  handleToggle,
  children,
}: {
  modalOpen: boolean;
  sideWidth?: number;
  handleToggle: () => void;
  children: JSX.Element;
}) {
  return (
    <Box component="nav">
      <Drawer
        open={modalOpen}
        variant="temporary"
        onClose={handleToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: sideWidth },
        }}
      >
        {children}
      </Drawer>
    </Box>
  );
}
