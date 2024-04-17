import React, { useContext } from "react";
import FormContext from "../context/FormContext";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { type IRecipeFormData } from "~/interface";

function GeneralReview({ formValues }: { formValues: IRecipeFormData }) {
  const {
    recipeName,
    prepTime,
    cookingTime,
    mealType,
    ingredientList,
    instructions,
  } = formValues;

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={2} paddingTop={2}>
          <Grid item xs={12} sm={12} md={8}>
            <Typography gutterBottom sx={{ fontSize: "14px" }}>
              Name: {recipeName}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: "14px" }}>
              Prep Time: {prepTime ?? "0"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Typography gutterBottom sx={{ fontSize: "14px" }}>
              Cooking Time: {cookingTime}
            </Typography>
            <Typography gutterBottom sx={{ fontSize: "14px" }}>
              Meal Type: {mealType ?? "Not Specified"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container direction="column" xs={12}>
        <Divider>
          <Typography
            gutterBottom
            sx={{
              fontSize: "0.875rem",
              fontWeight: "500",
              lineHeight: "25px",
              paddingY: "10px",
            }}
          >
            Ingredient List
          </Typography>
        </Divider>
        <Grid container>
          {ingredientList?.map(({ amount, ingredient, measurement }, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography gutterBottom sx={{ fontSize: "14px" }}>
                  &bull; {`${amount} ${measurement ?? ""} ${ingredient}`}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
      <Grid item container direction="column" xs={12}>
        <Divider>
          <Typography
            gutterBottom
            sx={{
              fontSize: "0.875rem",
              fontWeight: "500",
              lineHeight: "25px",
              paddingY: "10px",
            }}
          >
            Instructions
          </Typography>
        </Divider>
        <Grid container>
          {instructions?.map(({ instruction }, idx) => (
            <React.Fragment key={idx}>
              <Grid item xs={12}>
                <Typography gutterBottom sx={{ fontSize: "14px" }}>
                  {`${idx + 1}. ${instruction}`}
                </Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

/**
 * Last page of Foodie Recipe Form,
 * displays a review list of all items before submission
 *
 * Props: none
 * State: none
 */
export default function ReviewField() {
  const foodie = useContext(FormContext);
  const { values }: { values: IRecipeFormData } = useFormikContext();

  return (
    <Box
      sx={{
        display: `${foodie?.step === 3 ? "block" : "none"}`,
        backgroundColor: "#ececec",
        padding: "10px",
      }}
    >
      <Typography
        gutterBottom
        sx={{
          fontSize: "1.1rem",
          fontWeight: "500",
          lineHeight: "25px",
        }}
      >
        Review of Recipe
      </Typography>
      <Grid container>
        <GeneralReview formValues={values} />
      </Grid>
    </Box>
  );
}
