import { UploadButton } from "~/utils/uploadthing";

import { useContext, useState } from "react";
import FormContext from "../context/FormContext";
import InputField from "~/components/formFields/InputField";
import { Box, Grid, Typography, InputAdornment, Alert } from "@mui/material";
import useToggle from "~/hooks/useToggle";

/**
 * First page of Foodie Recipe Form
 *
 * Props:
 *     formField: { recipeName, mealType, prepTime, cookingTime }
 *     handleFild: function
 * State: none
 */
export default function GeneralInfoField({
  handleFile,
}: {
  handleFile: (file: string | null) => void;
}) {
  const foodie = useContext(FormContext);
  const [alertSuccessValue, toggleAlertSuccess] = useToggle(false);
  const [alertErrorValue, toggleAlertError] = useToggle(false);
  
  const componentDisplay = foodie?.step === 0 ? "block" : "none";
  const minuteProps = {
    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
  };

  return (
    <Box sx={{ display: componentDisplay, paddingX: { xs: 2, sm: 2, md: 0 } }}>
      <Typography variant="h6" gutterBottom paddingBottom={2}>
        General Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6}>
          <InputField name="recipeName" label="Recipe Name*" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputField name="mealType" label="Meal Type" />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputField
            name="prepTime"
            label="Prep Time"
            type="number"
            InputProps={minuteProps}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <InputField
            name="cookingTime"
            label="Cooking Time*"
            type="number"
            InputProps={minuteProps}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <UploadButton
            className="custom-upload"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res[0] && typeof res[0].url === "string") {
                handleFile(res[0].url);
              }

              toggleAlertSuccess(true);
            }}
            onUploadError={(error: Error) => {
              console.error(error);
              toggleAlertError(true);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          {alertSuccessValue && 
            <Alert severity="success" sx={{ padding: "3px 16px" }}>
              Upload Successful!
            </Alert>
          }
          {alertErrorValue && 
            <Alert severity="error" sx={{ padding: "3px 16px" }}>
              Upload Unsuccessful
            </Alert>
          }
        </Grid>
      </Grid>
    </Box>
  );
}
