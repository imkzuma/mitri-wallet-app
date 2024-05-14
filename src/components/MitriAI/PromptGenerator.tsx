import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import MarkdownView from 'react-showdown';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Flex, Text, Button, useColorModeValue, Stack, Skeleton } from "@chakra-ui/react";
import { ExpensesProps } from "@/lib/redux/state/expenses";
import { IncomesProps } from "@/lib/redux/state/incomes";

const PromptView = ({ prompt }: { prompt: string }) => {
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.700')}
      px={10} py={5}
      rounded={'lg'}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.800')}
    >
      <Text>
        <MarkdownView markdown={prompt} />
      </Text>
    </Flex>
  )
}

export default function FinancePromptGenerator() {
  const GeminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

  const mitriAI = new GoogleGenerativeAI(GeminiApiKey);
  const model = mitriAI.getGenerativeModel({ model: 'gemini-pro' });

  const [response, setResponse] = useState<{ prompt: string; isLoading: boolean }>({
    prompt: "", isLoading: true
  });

  const expenses = useAppSelector((state: RootState) => state.expenses.data);
  const incomes = useAppSelector((state: RootState) => state.incomes.data);

  const generate = async () => {
    const prompt = generateFinancePrompt(expenses, incomes);
    console.log(prompt);
    setResponse((prevState) => { return { ...prevState, isLoading: true } });
    try {
      const result = await model.generateContent(prompt);
      console.log(result);
      const response = await result.response;
      const text = await response.text();

      setResponse((prevState) => { return { ...prevState, prompt: text } });
    } catch (error) {
      console.error(error);
    } finally {
      setResponse((prevState) => { return { ...prevState, isLoading: false } });
    }
  }

  useEffect(() => {
    if (expenses.length > 0 && incomes.length > 0) {
      generate();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses, incomes]);

  const generateFinancePrompt = (expenses: ExpensesProps[], incomes: IncomesProps[]) => {
    let prompt = "Berdasarkan data keuangan yang telah kami ambil, berikut adalah ringkasan keuangan Anda:\n";

    if (expenses.length > 0) {
      prompt += "Pengeluaran:\n";
      expenses.forEach((expense, index) => {
        prompt += `${index + 1}. ${expense.description}: ${expense.amount}\n`;
      });
    } else {
      prompt += "Anda belum memiliki catatan pengeluaran.\n";
    }

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

    prompt += "\nApa yang dapat Anda simpulkan dari ringkasan keuangan ini?";

    return prompt;
  }

  return (
    <>
      {response.isLoading
        ? <Skeleton height={'30rem'} rounded={'lg'} />
        : (
          <Stack spacing={5} py={5}>
            <PromptView prompt={response.prompt} />
            <Button colorScheme={'blue'} px={12} onClick={generate}>
              Ask MiTri AI again
            </Button>
          </Stack>
        )}
    </>
  )
}
