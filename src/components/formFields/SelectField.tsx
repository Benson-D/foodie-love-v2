import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useField } from "formik";

interface FoodieOptions {
  value: string | undefined;
  label: string;
}

interface SelectProps {
  name: string;
  label: string;
  data: FoodieOptions[] | undefined;
  fullWidth: boolean;
}

/**
 * Select field for general select dropdown
 *
 * Props:
 *     selectField: { name, label, data, fullWidth }
 * State: none
 */
function SelectField(props: SelectProps) {
  const { label, data, ...rest } = props;
  const [field] = useField(props);

  return (
    <FormControl {...rest} variant="standard">
      <InputLabel>{label}</InputLabel>
      <Select {...field}>
        {data?.map((option: FoodieOptions, index: number) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectField;
