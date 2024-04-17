import { Grid, Typography, Button } from "@mui/material";
import { useContext } from "react";
import FormContext from "../context/FormContext";
import { FieldArray } from "formik";
import TextareaField from "~/components/formFields/TextareaField";
import { type IFormFieldProps, type InstructionItems } from "~/interface";
import DeleteFormButton from "~/components/DeleteFormButton";

/**
 *  Renders a single container for instruction inputs
 *
 * Props:
 *     index: number
 *     removeItem: Formik helper (function)
 * State: none
 */
function InstructionFieldInput({ index, removeItemCb }: IFormFieldProps) {
  return (
    <>
      <Grid item xs={10} sm={10}>
        <TextareaField
          name={`instructions.${index}.instruction`}
          label="Instruction"
        />
      </Grid>
      <Grid item xs={2} sm={2}>
        <DeleteFormButton index={index} removeItemCb={removeItemCb} />
      </Grid>
    </>
  );
}

function InstructionsField({ values }: { values: InstructionItems[] }) {
  const foodie = useContext(FormContext);

  return (
    <div style={{ display: `${foodie?.step === 2 ? "block" : "none"}` }}>
      <Typography variant="h6" gutterBottom paddingBottom={2}>
        Add Recipe Instructions
      </Typography>
      <Grid container spacing={3}>
        <FieldArray name="instructions">
          {({
            remove,
            push,
          }: {
            remove: (index: number) => void;
            push: ({ instruction }: { instruction: string }) => void;
          }) => (
            <>
              {values.map((_, idx: number) => (
                <InstructionFieldInput
                  key={idx}
                  index={idx}
                  removeItemCb={remove}
                />
              ))}
              <Button
                type="button"
                sx={{ my: 3, ml: 2 }}
                onClick={() => push({ instruction: "" })}
              >
                Add Instruction
              </Button>
            </>
          )}
        </FieldArray>
      </Grid>
    </div>
  );
}

export default InstructionsField;
