import { Additionals, DataContextType } from "@types";
import { createContext } from "react";

export const DataContext = createContext<DataContextType>({
  invoice: null,
  payment: null,
  apiConfig: null,
  personal: null,
  emailConfig: null,
  worktime: [],
  additionals: [] as Additionals,
});
