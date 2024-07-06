import { Grid, Typography, Button, Box } from "@mui/material";
import { useContext } from "react";
import { FieldArray } from "formik";
import FormContext from "../context/FormContext";
import InputField from "~/components/formFields/InputField";
import SelectField from "~/components/formFields/SelectField";
import DeleteFormButton from "../../../components/DeleteFormButton";
import { type IngredientItems } from "~/interface";
import { type IFormFieldProps } from "~/interface";

import { api } from "~/utils/api";

/**
 *  Renders a single container for ingredient inputs
 *
 * Props:
 *     index: number
 *     removeItem: Formik helper (function)
 * State: none
 */
function IngredientFieldInputs({ index, removeItemCb }: IFormFieldProps) {
  let { data: measurementUnits } = api.recipe.getAllMeasurements.useQuery();

  if (!measurementUnits) {
	measurementUnits = [];
  }

  return (
    <>
      <Grid item xs={6} sm={6} md={2}>
        <InputField name={`ingredientList.${index}.amount`} label="Amount*" />
      </Grid>
      <Grid item xs={6} sm={6} md={4}>
        <SelectField
          name={`ingredientList.${index}.measurement`}
          label="Measurement"
          data={measurementUnits}
          fullWidth
        />
      </Grid>
      <Grid item xs={10} sm={10} md={5}>
        <InputField
          name={`ingredientList.${index}.ingredient`}
          label="Ingredient*"
        />
      </Grid>
      <Grid item xs={2} sm={2} md={1}>
        <DeleteFormButton index={index} removeItemCb={removeItemCb} />
      </Grid>
    </>
  );
}

const generalIngredientList: IngredientItems = {
  amount: "",
  measurement: "",
  ingredient: "",
};

export default function IngredientsField({ values }: { values: IngredientItems[] }) {
  const foodie = useContext(FormContext);

  return (
    <Box sx={{ display: `${foodie?.step === 1 ? "block" : "none"}`, paddingX: { xs: 2, sm: 2, md: 0 }  }}>
      <Typography variant="h6" gutterBottom paddingBottom={2}>
        Ingredient List
      </Typography>
      <Grid container spacing={2}>
        <FieldArray name="ingredientList">
          {({
            remove,
            push,
          }: {
            remove: (index: number) => void;
            push: (list: IngredientItems) => void;
          }) => (
            <>
              {values.map((ingredient: IngredientItems, index: number) => (
                <IngredientFieldInputs
                  key={index}
                  index={index}
                  removeItemCb={remove}
                />
              ))}
              <Button
                type="button"
                sx={{ my: 3, ml: 2 }}
                onClick={() => push(generalIngredientList)}
              >
                Add Ingredient
              </Button>
            </>
          )}
        </FieldArray>
       
      </Grid>
    </Box>
  );
}
