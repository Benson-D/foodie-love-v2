import { UploadButton } from "~/utils/uploadthing";

import { useContext } from "react";
import FormContext from "../context/FormContext";
import InputField from "~/components/formFields/InputField";
import { Box, Grid, Typography, InputAdornment } from "@mui/material";

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

  const componentDisplay = foodie?.step === 0 ? "block" : "none";
  const minuteProps = {
    endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
  };

  return (
    <Box sx={{ display: componentDisplay }}>
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

              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
