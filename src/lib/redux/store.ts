import { configureStore } from '@reduxjs/toolkit';
import incomes from '@/lib/redux/state/incomes';
import expenses from '@/lib/redux/state/expenses';

export const store = configureStore({
  reducer: {
    incomes: incomes.reducer,
    expenses: expenses.reducer,
  }
})

export type AppStore = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch