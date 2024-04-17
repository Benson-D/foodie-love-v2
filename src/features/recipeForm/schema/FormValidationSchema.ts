import * as Yup from "yup";

//Foodie Validation Schema for Form
const FormValidationSchema = [
  Yup.object().shape({
    recipeName: Yup.string().required("Recipe name is required"),
    mealType: Yup.string(),
    prepTime: Yup.number(),
    cookingTime: Yup.number()
      .positive("Must be at least be 5 minutes")
      .min(5)
      .required("A number of minutes is required"),
  }),
  Yup.object().shape({
    ingredientList: Yup.array()
      .of(
        Yup.object().shape({
          amount: Yup.string().required("An amount is required"),
          measurement: Yup.string().notRequired(),
          ingredient: Yup.string().required("An ingredient is required"),
        }),
      )
      .min(1),
  }),
];

export default FormValidationSchema;