import * as yup from 'yup'

export const personalSchema = yup.object({
    name: yup.string().required('Name is required'),
    info: yup.string().required('Personal info is required'),
    companyInfo: yup.string().required('Company info is required')
})

export const invoiceSchema = yup.object({
    number: yup.string().required(),
    issuedDate: yup.string().required(),
    dueDate: yup.string().required(),
    from: yup.string().required(),
    to: yup.string().required(),
    rate: yup.number().required(),
})

export const paymentSchema = yup.object({
    type: yup.string().required(),
    accountTitle: yup.string().required(),
    bank: yup.string().required(),
    routing: yup.string().required(),
    account: yup.string().required()
})

export const apiConfigSchema = yup.object({
    accountId: yup.number().typeError('Must be a number').required('Required'),
    token: yup.string().length(97, 'Must be 97 characters').required('Required')
})


export const sendEmailConfigSchema = yup.object({
  emailTo: yup
    .string()
    .email("Invalid email")
    .required("Recipient email is required"),
  emailSender: yup
    .string()
    .email("Invalid email")
    .required("Sender email is required"),
  smtp: yup.string().required("SMTP address is required"),
  port: yup.number().required("PORT is required"),
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
  encryption: yup.string().required("Encryption is required"),
});

export const additionalSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
  clientName: yup.string().required("Client Name is required"),
  value: yup
    .number()
    .typeError("Value must be a number")
    .min(0, "Value must be at least 0")
    .required("Value is required"),
  view: yup.boolean().required(),
});

export const additionalsSchema = yup.object().shape({
  additionals: yup
    .array()
    .of(additionalSchema)
    .min(1, "At least one additional item is required"),
});