import { InferType } from "yup";
import {
  personalSchema,
  apiConfigSchema,
  invoiceSchema,
  paymentSchema,
  sendEmailConfigSchema,
} from "@utils/schemas";

type Personal = InferType<typeof personalSchema>;
type Invoice = InferType<typeof invoiceSchema>;
type ApiConfig = InferType<typeof apiConfigSchema>;
type Payment = InferType<typeof paymentSchema>;
type EmailConfig = InferType<typeof sendEmailConfigSchema>;
type Additionals = InferType<typeof additionalsSchema>;

type DataContextType = {
  invoice: Invoice | null;
  payment: Payment | null;
  apiConfig: ApiConfig | null;
  personal: Personal | null;
  emailConfig: EmailConfig | null;
  worktime: any[];
  additionals: Additionals | null;
};
