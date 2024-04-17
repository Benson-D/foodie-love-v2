import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ImageSlider from "../features/imageSlider/ImageSlider";

const HomeLayout = styled("section")({
  backgroundImage: `linear-gradient(4deg,
                        rgb(168 120 99 / 30%) 45%,
                        rgba(232,120,12,0.3) 100%),
                        url(/img/foodie-background-2.jpg)`,
  backgroundPosition: "bottom left",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "92vh",
  color: "#fff",
  paddingTop: 60,
  paddingBottom: 70,
  paddingLeft: 26,
});

export default function Home() {
  return (
    <HomeLayout>
      <Typography variant="h3" sx={{ fontSize: { xs: 30, sm: 45, md: 50 } }}>
        Welcome To Foodie Love!
      </Typography>
      <p>A place to keep your recipes in check</p>
      <ImageSlider />
    </HomeLayout>
  );
}