import { SignIn } from "@clerk/nextjs";
import { Paper, Grid, Box} from "@mui/material";

export default function Login() {
	return (
		<Grid container component="main" sx={{ height: "100vh" }}>
			<Grid
			item
			xs={false}
			sm={false}
			md={6}
			sx={{
				backgroundImage: "url(/img/foodie-background-3.jpg)",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
			>
			</Grid>
			<Grid item xs={12} sm={12} md={6} component={Paper}>
			<Box
				sx={{
				paddingTop: 5,
				paddingX: 10,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				}}
			>
				<SignIn redirectUrl={"/recipes"} />
			</Box>
			</Grid>
	  	</Grid>
	)
}