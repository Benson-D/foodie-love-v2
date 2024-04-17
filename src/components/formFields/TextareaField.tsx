import { useField } from "formik";
import { TextField } from "@mui/material";

interface InputProps {
  name: string;
  label: string;
}

/**
 * Textarea field for general textarea inputs
 *
 * Props:
 *     textareaField: { name, label }
 * State: none
 */
function TextareaField(props: InputProps) {
  const { ...rest } = props;
  const [field] = useField(props);

  return <TextField multiline fullWidth maxRows={4} {...field} {...rest} />;
}

export default TextareaField;
