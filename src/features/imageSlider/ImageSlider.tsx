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
  maxWidth: 340,
  marginTop: "2rem",
  height: 300,
  [theme.breakpoints.up("sm")]: {
    maxWidth: 450,
    height: 300,
    marginTop: "7rem",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 550,
    height: 400,
    marginTop: "4rem",
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
      <div
        style={{
          height: "300px",
          width: "100%",
          whiteSpace: "nowrap",
          transform: `translate3d(${-image * 100}%, 0, 0)`,
          transition: "transform ease-out 1s",
        }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "inline-block",
              backgroundImage: `url(${item.url})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "100%",
              width: "100%",
            }}
          ></div>
        ))}
      </div>
      <Arrow direction="left" handleClick={prevSwitchStep} />
      <Arrow direction="right" handleClick={nextSwitchStep} />
    </ImageLayout>
  );
}

export default ImageSlider;
