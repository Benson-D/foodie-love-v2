import { type IFormFieldProps } from "~/interface";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const delectIcon = {
  width: "40px",
  height: "1.50rem",
  fontSize: "0.875rem",
  color: "hsl(0deg 0% 0% / 38%)",
  padding: "8px 0",
  "&:hover": {
    backgroundColor: "#ffe0e0",
    color: "hsl(0deg 80% 61%)",
  },
} as const;

/** Deletes an individual item field in Form Steps */
export default function DeleteFormButton({ index, removeItemCb }: IFormFieldProps) {
  return (
    <Button
      type="button"
      onClick={() => removeItemCb(index)}
      sx={{
        minWidth: "40px",
        height: "2.5rem",
        mt: 1,
        padding: 0,
        "&:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      <DeleteIcon sx={delectIcon} />
    </Button>
  );
}
