import React, { useState } from "react";
import { type IRecipeFormData } from "~/interface";

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

//Initial Values of Foodie Form
const initialValues: IRecipeFormData = {
  recipeName: "",
  mealType: "",
  prepTime: 0,
  cookingTime: 0,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ingredientList: Array(5).fill({
    amount: "",
    measurement: "",
    ingredient: "",
  }),
  instructions: [{ instruction: "" }],
};

/**
 * Renders a multi step form to add a new Recipe
 *
 * Props: none
 * State:
 *   formImage: File | string
 */
function CreateRecipeForm({
  toggleValue,
}: {
  toggleValue?: (value?: boolean) => void;
}) {
  const [formImage, setFormImage] = useState<string | File>("");
  const [step, helpers] = useStep(4);

  const { canGoToPreviousStep, canGoToNextStep, previousStep, nextStep } =
    helpers;

  /**
   * Sets Image state for recipeImage
   * @param evt
   */
  function handleFile(evt: React.ChangeEvent<HTMLInputElement>): void {
    const image = evt.target.files?.[0];
    if (image) setFormImage(image);
  }

//   async function uploadRecipeImageToS3(): Promise<string> {
//     const sendData: FormData = new FormData();
//     sendData.append("recipeImage", formImage);

//     const recipeImage = await createS3Image(sendData).unwrap();
//     return recipeImage.url;
//   }

  async function handleSubmission(recipeForm: IRecipeFormData) {
	console.log(recipeForm, "recipe form");
    // const recipeImage = await uploadRecipeImageToS3();

    // if (recipeImage) recipeForm["recipeImage"] = recipeImage;
    // createRecipe(recipeForm);

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

  console.log(FormValidationSchema);

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
