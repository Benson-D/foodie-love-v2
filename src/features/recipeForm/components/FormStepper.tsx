import { Stepper, Step, StepLabel } from "@mui/material";

function FormStepper({ step }: { step: number }): JSX.Element {
  const formLabels = ["General Info", "Ingredients", "Steps", "Review"];

  return (
    <Stepper
      activeStep={step}
      sx={{ pt: 4, pb: 5, display: { xs: "none", sm: "none", md: "flex" } }}
    >
      {formLabels.map((label: string) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default FormStepper;
