import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Arrow from "./components/Arrow";
import useStep from "../../hooks/useStep";
import useInterval from "../../hooks/useInterval";

const sliderImage = [
  { url: "/img/gallery1.jpg", title: "mexican" },
  { url: "/img/gallery2.jpg", title: "burger" },
  { url: "/img/gallery3.jpg", title: "indian" },
  { url: "/img/gallery4.jpg", title: "pizza" },
  { url: "/img/gallery5.jpg", title: "pasta" },
];

const ImageLayout = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  marginTop: "3.25rem",
  maxWidth: "92%",
  height: 300,
  [theme.breakpoints.up("sm")]: {
    maxWidth: 525,
    height: 400
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 650,
    height: 500,
  },
}));

/**
 * Image Slider rendering on Home Page, displays a list of popular recipes
 */
function ImageSlider() {
  const [items] = useState(sliderImage);
  const [image, helpers] = useStep(sliderImage.length);
  const { nextSwitchStep, prevSwitchStep } = helpers;

  // Switch images through interval changes
  useInterval(nextSwitchStep, 2500);

  return (
    <ImageLayout>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          whiteSpace: "nowrap",
          transform: `translate3d(${-image * 100}%, 0, 0)`,
          transition: "transform ease-out 1s",
        }}
      >
        {items.map((item, idx) => (
          <Box
            key={idx}
            sx={{
              display: "inline-block",
              backgroundImage: `url(${item.url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100%",
              width: "100%",
            }}
          ></Box>
        ))}
      </Box>
      <Arrow direction="left" handleClick={prevSwitchStep} />
      <Arrow direction="right" handleClick={nextSwitchStep} />
    </ImageLayout>
  );
}

export default ImageSlider;
