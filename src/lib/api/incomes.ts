import { AxiosError } from "axios";
import { WalletApi } from "@/lib/api";

interface IncomeItem {
  id: number;
  amount: number | null;
  from: string;
  description: string;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export const getMyIncomes = async (uid: string): Promise<IncomeItem[]> => {
  try {
    const { data } = await WalletApi.get('/incomes');
    if (Array.isArray(data)) {
      const filteredData = data.filter((item: IncomeItem) => item.userId === uid);
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

export const getDetailMyIncome = async (uid: string, id: string): Promise<IncomeItem> => {
  try {
    const { data } = await WalletApi.get(`/incomes/${id}`);
    if (data.userId === uid) {
      return data;
    }
    throw new Error('Unauthorized');
  } catch (error: any) {
    console.log(error)
    if (error instanceof AxiosError) {
      console.log(error.response?.data.message || error.message)
      throw new Error(error.response?.data.message || error.message);
    }

    throw new Error(error.message);
  }
};

export const addMyIncome = async (userId: string, income: Omit<IncomeItem, 'id' | 'userId'>) => {
  try {
    const response = await WalletApi.post('/incomes', { ...income, userId });
    return response;
  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }

    throw new Error(error.message);
  }
};

export const deleteMyIncome = async (id: number, uid: string): Promise<void> => {
  try {
    const { data } = await WalletApi.get(`/incomes/${id}`);
    if (data.userId !== uid) {
      throw new Error('Unauthorized');
    }

    const response = await WalletApi.delete(`/incomes/${id}`);
    return response.data;

  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }

    throw new Error(error.message);
  }
};

export const updateMyIncome = async (id: string, uid: string, income: Omit<IncomeItem, 'userId' | 'id'>): Promise<IncomeItem> => {
  try {
    const { data } = await WalletApi.get(`/incomes/${id}`);
    if (data.userId !== uid) {
      throw new Error('Unauthorized');
    }

    const response = await WalletApi.put(`/incomes/${id}`, income);
    return response.data;

  } catch (error: any) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }

    throw new Error(error.message);
  }
}