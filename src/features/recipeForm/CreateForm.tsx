import { useState } from "react";
import { type IRecipeFormData, type IngredientItems } from "~/interface";

import { Box, Button, MobileStepper } from "@mui/material";
import FormLayout from "./layout/FormLayout";

import FormStepper from "./components/FormStepper";
import GeneralInfoField from "./components/GeneralInfoField";
import IngredientsField from "./components/IngredientsField";
import InstructionsField from "./components/InstructionsField";
import ReviewField from "./components/ReviewField";

import { Formik, Form, type FormikHelpers, type FormikState } from "formik";
import FormContext from "./context/FormContext";
import FormValidationSchema from "./schema/FormValidationSchema";

import useStep from "../../hooks/useStep";
import { api } from "~/utils/api";

import { useUser } from '@clerk/nextjs';

// Ensure each object in the array is an instance of IngredientItems
const ingredientList: IngredientItems[] = Array.from({ length: 5 }, () => ({
  amount: "",
  measurement: "",
  ingredient: ""
}));

//Initial Values of Foodie Form
const initialValues: IRecipeFormData = {
  recipeName: "",
  mealType: "",
  prepTime: 0,
  cookingTime: 0,
  recipeImage: "",
  ingredientList: ingredientList,
  instructions: [{ instruction: "" }],
  userId: ""
};

/**
 * Renders a multi step form to add a new Recipe
 */
function CreateRecipeForm({
  toggleValue,
}: {
  toggleValue?: (value?: boolean) => void;
}) {
  const [formImages, setFormImages] = useState<Array<string>>([]);
  const [step, helpers] = useStep(4);
  const { user } = useUser();

  const { mutate: createRecipe } = api.recipe.createRecipe.useMutation();

  const { canGoToPreviousStep, canGoToNextStep, previousStep, nextStep } = helpers;

  /**
   * Sets Image state for recipeImage
   * @param evt
   */
  function handleFile(file: string | null): void {
    if (typeof file === "string") {
      setFormImages((currentImages) => [...currentImages, file]);
    }
  }

  async function handleSubmission(recipeForm: IRecipeFormData) {
    if (formImages.length > 0) {
      recipeForm.recipeImage = formImages.join(',');
    }

    if (user?.id) {
      recipeForm.userId = user.id;
    }

    createRecipe(recipeForm);

    if (toggleValue) {
      toggleValue(false);
    }
  }

  async function _submitForm(
    values: IRecipeFormData,
    actions: FormikHelpers<IRecipeFormData>,
  ) {
    if (!canGoToNextStep) {
      void handleSubmission(values);
    } else {
      nextStep();
      void actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  return (
    <FormLayout title="Create a Recipe">
      <>
        <FormStepper step={step} />
        <FormContext.Provider value={{ step }}>
          <Formik
            initialValues={initialValues}
            validationSchema={FormValidationSchema[step]}
            onSubmit={_submitForm}
          >
            {({ values, isSubmitting }: FormikState<IRecipeFormData>) => (
              <Form>
                <GeneralInfoField handleFile={handleFile} />
                <IngredientsField values={values.ingredientList} />
                <InstructionsField values={values.instructions} />
                <ReviewField />
                <Box
                  sx={{
                    display: { xs: "none", sm: "none", md: "flex" },
                    justifyContent: "flex-end",
                  }}
                >
                  {canGoToPreviousStep && (
                    <Button sx={{ mt: 3, ml: 1 }} onClick={previousStep}>
                      Back
                    </Button>
                  )}
                  <Button
                    disabled={isSubmitting}
                    sx={{ mt: 3, ml: 1 }}
                    type="submit"
                    variant="contained"
                  >
                    {!canGoToNextStep ? "Submit" : "Next"}
                  </Button>
                </Box>
                <MobileStepper
                  variant="text"
                  steps={4}
                  sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
                  position="static"
                  activeStep={step}
                  nextButton={
                    <Button size="small" type="submit">
                      {!canGoToNextStep ? "Submit" : "Next"}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={previousStep}>
                      Back
                    </Button>
                  }
                />
              </Form>
            )}
          </Formik>
        </FormContext.Provider>
      </>
    </FormLayout>
  );
}

export default CreateRecipeForm;
