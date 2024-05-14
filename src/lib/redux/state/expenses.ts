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
    deleteExpense: (state: any, action) => {
      if (Array.isArray(state.data)) {
        state.data = state.data.filter((item: any) => item.id !== action.payload);
      } else if (typeof state.data === 'object' && state.data !== null) {
        if (state.data.id === action.payload) {
          state.data = null;
        }
      }
    },
    editExpense: (state: any, action) => {
      if (Array.isArray(state.data)) {
        state.data = state.data.map((item: any) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      } else if (typeof state.data === 'object' && state.data !== null) {
        if (state.data.id === action.payload.id) {
          state.data = action.payload;
        }
      }
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