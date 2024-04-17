//import { alpha } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

export const StyledSearch = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "94%",
  },
}));