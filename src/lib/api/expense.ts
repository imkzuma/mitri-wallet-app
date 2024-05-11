import { AxiosError } from "axios";
import { WalletApi } from "@/lib/api";

interface ExpenseItem {
  id: number;
  amount: number | null;
  to: string;
  description: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export const getMyExpenses = async (uid: string): Promise<ExpenseItem[]> => {
  try {
    const { data } = await WalletApi.get('/expenses');
    if (Array.isArray(data)) {
      const filteredData = data.filter((item: ExpenseItem) => item.userId === uid);
      return filteredData;
    }
    return [];
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }

    throw new Error(error.message);
  }
};

export const getDetailMyExpense = async (uid: string, id: string): Promise<ExpenseItem> => {
  try {
    const { data } = await WalletApi.get(`/expenses/${id}`);
    if (data.userId === uid) {
      return data;
    }
    throw new Error('Unauthorized');
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }

    throw new Error(error.message);
  }
};

export const addMyExpense = async (userId: string, expense: Omit<ExpenseItem, 'id' | 'userId'>) => {
  try {
    const response = await WalletApi.post('/expenses', { ...expense, userId });
    return response;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }

    throw new Error(error.message);
  }
};

export const deleteMyExpense = async (id: number, uid: string): Promise<void> => {
  try {
    const { data } = await WalletApi.get(`/expenses/${id}`);
    if (data.userId !== uid) {
      throw new Error('Unauthorized');
    }

    const response = await WalletApi.delete(`/expenses/${id}`);
    return response.data;

  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }

    throw new Error(error.message);
  }
};

export const updateMyExpense = async (id: string, uid: string, expense: Omit<ExpenseItem, 'userId' | 'id'>): Promise<ExpenseItem> => {
  try {
    const { data } = await WalletApi.get(`/expenses/${id}`);
    if (data.userId !== uid) {
      throw new Error('Unauthorized');
    }

    const response = await WalletApi.put(`/expenses/${id}`, expense);
    return response.data;

  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }

    throw new Error(error.message);
  }
}