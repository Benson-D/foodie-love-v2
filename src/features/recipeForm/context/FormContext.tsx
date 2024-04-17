import { createContext } from "react";

const FormContext = createContext<{ step: number } | null>(null);

export default FormContext;
