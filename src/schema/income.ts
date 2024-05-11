import * as Yup from 'yup';

export const IncomeSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .min(1, 'Amount must be greater than 0'),
  from: Yup.string()
    .required('Source is required'),
  description: Yup.string()
    .optional(),
  date: Yup.date()
    .required('Date is required'),
});