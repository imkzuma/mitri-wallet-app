import * as Yup from 'yup';

export const ExpenseSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .min(1, 'Amount must be greater than 0'),
  to: Yup.string()
    .required('Expense Source is required'),
  description: Yup.string()
    .optional(),
  date: Yup.date()
    .required('Date is required'),
});