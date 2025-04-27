import { InferType } from "yup";
import {
  personalSchema,
  apiConfigSchema,
  invoiceSchema,
  paymentSchema,
} from "@utils/schemas";

type Personal = InferType<typeof personalSchema>;
type Invoice = InferType<typeof invoiceSchema>;
type ApiConfig = InferType<typeof apiConfigSchema>;
type Payment = InferType<typeof paymentSchema>;

type DataContextType = {
  invoice: Invoice | null;
  payment: Payment | null;
  apiConfig: ApiConfig | null;
  personal: Personal | null;
  worktime: any[];
};
