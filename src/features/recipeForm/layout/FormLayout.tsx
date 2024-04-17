import { Box, Paper, Typography } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import FoodBankIcon from "@mui/icons-material/FoodBank";

let formTheme = createTheme({
  palette: {
    primary: {
      main: "#06a696",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "h4" },
          style: {
            fontSize: "30px",
            padding: "14px 0",
            backgroundColor: "#04b597",
            textAlign: "center",
          },
        },
      ],
    },
  },
});

formTheme = responsiveFontSizes(formTheme);

/**
 * General Form Layout
 *
 * Props:
 *      children: JSX.Element
 *  State: none
 */
function FormLayout(props: { children: JSX.Element; title: string }) {
  const { children, title } = props;

  return (
    <ThemeProvider theme={formTheme}>
      <Box component="section">
        <Paper variant="outlined" sx={{ boxShadow: 2 }}>
          <Typography
            component="h1"
            variant="h4"
            color="secondary"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {title}
            <FoodBankIcon
              sx={{ ml: 2, fontSize: { xs: "30px", sm: "30px", md: "40px" } }}
            />
          </Typography>
          <Box sx={{ p: { xs: 2, md: 5 } }}>{children}</Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default FormLayout;
