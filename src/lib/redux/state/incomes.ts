import { createSlice } from "@reduxjs/toolkit";

export interface IncomesProps {
  id: number;
  amount: number;
  from: string;
  description: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

interface initialStateProps {
  data: IncomesProps[];
  isLoading: boolean;
  error: null | string;
};

const initialState: initialStateProps = {
  data: [],
  isLoading: false,
  error: null,
};

const incomes = createSlice({
  name: "incomes",
  initialState: initialState,
  reducers: {
    fetchIncomesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchIncomesSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    fetchIncomesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchIncomesEnd: (state) => {
      state.isLoading = false;
    },
    deleteIncome: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    editIncome: (state: any, action) => {
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
  fetchIncomesStart,
  fetchIncomesSuccess,
  fetchIncomesFailure,
  fetchIncomesEnd,
  deleteIncome,
  editIncome,
} = incomes.actions;

export default incomes;