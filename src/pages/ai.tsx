import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { Button, Text } from "@chakra-ui/react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getMyExpenses } from "@/lib/api/expense";
import { getMyIncomes } from "@/lib/api/incomes";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  fetchExpensesEnd,
  fetchExpensesFailure,
  fetchExpensesStart,
  fetchExpensesSuccess,
} from "@/lib/redux/state/expenses";
import {
  fetchIncomesEnd,
  fetchIncomesFailure,
  fetchIncomesStart,
  fetchIncomesSuccess,
} from "@/lib/redux/state/incomes";
import { useFirebaseAuth } from "@/lib/firebase/auth";
import { RootState } from "@/lib/redux/store";

interface Expense {
  description: string;
  amount: number;
}

interface Income {
  description: string;
  amount: number;
}

export default function AiPage() {
  const dispatch = useAppDispatch();
  const { user } = useFirebaseAuth();

  const mitriAI = new GoogleGenerativeAI("AIzaSyD86H4rNIyVWndfYOsUWXZaXb_WCvMmVQc")
  const model = mitriAI.getGenerativeModel({ model: 'gemini-pro' })

  const [response, setResponse] = useState<string>("");

  const expenses = useAppSelector((state: RootState) => state.expenses.data);
  const incomes = useAppSelector((state: RootState) => state.incomes.data);

  const generate = async () => {
    const storyPrompt = "Write a story about a magic backpack."

    const result = await model.generateContent(storyPrompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      dispatch(fetchExpensesStart());
      dispatch(fetchIncomesStart());

      try {
        const expensesData = await getMyExpenses(user.uid);
        dispatch(fetchExpensesSuccess(expensesData));
      } catch (expensesError: any) {
        dispatch(fetchExpensesFailure(expensesError.message));
      } finally {
        dispatch(fetchExpensesEnd());
      }

      try {
        const incomesData = await getMyIncomes(user.uid);
        dispatch(fetchIncomesSuccess(incomesData));
      } catch (incomesError: any) {
        dispatch(fetchIncomesFailure(incomesError.message));
      } finally {
        dispatch(fetchIncomesEnd());
      }
    };

    fetchData();
  }, [dispatch, user]);

  useEffect(() => {
    const generateFinance = async () => {
      if (expenses.length > 0 && incomes.length > 0) {
        const prompt = generateFinancePrompt(expenses, incomes);
        console.log(prompt); // Cetak prompt ke konsol untuk debugging

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        setResponse(text);
      }
    }

    generateFinance();
  }, [expenses, incomes]);

  const generateFinancePrompt = (expenses: Expense[], incomes: Income[]) => {
    let prompt = "Berdasarkan data keuangan yang telah kami ambil, berikut adalah ringkasan keuangan Anda:\n";

    // Menambahkan detail pengeluaran
    if (expenses.length > 0) {
      prompt += "Pengeluaran:\n";
      expenses.forEach((expense, index) => {
        prompt += `${index + 1}. ${expense.description}: ${expense.amount}\n`;
      });
    } else {
      prompt += "Anda belum memiliki catatan pengeluaran.\n";
    }

    // Menambahkan detail pemasukan
    if (incomes.length > 0) {
      prompt += "\nPemasukan:\n";
      incomes.forEach((income, index) => {
        prompt += `${index + 1}. ${income.description}: ${income.amount}\n`;
      });
    } else {
      prompt += "\nAnda belum memiliki catatan pemasukan.\n";
    }

    prompt += "\nTolong berikan analisis detail tentang kondisi keuangan Anda."
    prompt += "\nBerikan saran atau rekomendasi untuk meningkatkan kondisi keuangan Anda."
    prompt += "\nTolong berikan penjelasan se detail-detailnya kalau bisa lebih panjang."
    prompt += "\nTolong jawaban anda dalam format Yang Bisa di parsing ke website kami."

    // Menambahkan pertanyaan untuk mengarahkan pembaca agar merenungkan atau bertindak berdasarkan kondisi keuangan mereka.
    prompt += "\nApa yang dapat Anda simpulkan dari ringkasan keuangan ini?";

    return prompt;
  }

  return (
    <>
      <Head>
        <title>Mitri AI</title>
      </Head>
      <ProtectedMainLayout>
        <Button onClick={generate}>Generate</Button>
        {response && <Text>{response}</Text>}
      </ProtectedMainLayout>
    </>
  )
}
