import { createSlice } from "@reduxjs/toolkit";

export interface ExpensesProps {
  id: number;
  amount: number;
  to: string;
  description: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

interface initialStateProps {
  data: ExpensesProps[];
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateProps = {
  data: [],
  isLoading: false,
  error: null,
};

const expenses = createSlice({
  name: "expenses",
  initialState: initialState,
  reducers: {
    fetchExpensesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchExpensesSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchExpensesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchExpensesEnd: (state) => {
      state.isLoading = false;
    },
    deleteExpense: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    editExpense: (state, action) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }

        return item;
      });
    },
  },
});

export const {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  fetchExpensesEnd,
  deleteExpense,
  editExpense,
} = expenses.actions;

export default expenses;