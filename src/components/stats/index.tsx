import { Button, Flex, Heading, Icon, Stack } from "@chakra-ui/react";
import Statistics from "./stats";
import { useRouter } from "next/router";
import { FiUpload, FiDownload } from "react-icons/fi";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import Link from "next/link";

export default function WalletStatistic() {
  const router = useRouter();

  const expense = useAppSelector((state: RootState) => state.expenses);
  const income = useAppSelector((state) => state.incomes);

  const totalExpense = Array.isArray(expense.data) ? expense.data.reduce((acc, item) => acc + item.amount, 0) : 0;
  const totalIncome = Array.isArray(income.data) ? income.data.reduce((acc, item) => acc + item.amount, 0) : 0;

  const saldo = totalIncome - totalExpense;

  return (
    <Stack py={8} spacing={5}>
      <Heading fontSize={'2xl'}>
        Wallet Statistics
      </Heading>
      <Flex
        align={'center'}
        gap={{ base: 4, md: 8 }}
        flexWrap={'wrap'}
        flexDir={{ base: 'row', md: 'row' }}
      >
        <Statistics
          title="Income"
          amount={totalIncome}
          percent={totalIncome !== 0 ? (totalIncome - totalExpense) / totalIncome : 0}
          loading={income.isLoading}
        />
        <Statistics
          title="Expense"
          amount={totalExpense}
          percent={totalExpense !== 0 ? totalExpense / totalIncome : 0}
          loading={expense.isLoading}
        />
        <Statistics
          title="Saldo"
          amount={saldo}
          percent={totalIncome !== 0 ? saldo / totalIncome : 0}
          loading={income.isLoading || expense.isLoading}
        />
      </Flex>

      <Flex align={'center'} gap={{ base: 4, md: 8 }} flexDir={{ base: 'row', md: 'row' }}>
        <Button
          colorScheme={'blue'}
          w={{ base: 'full' }}
          h={{ base: 24, md: '36' }}
          flexDir={'column'}
          gap={{ base: 3, md: 5 }}
          fontSize={{ base: 'lg', md: 'xl' }}
          onClick={() => router.push("/wallet/incomes/add")}
        >
          <Icon as={FiDownload} boxSize={{ base: 5, md: 6 }} />
          Add Income
        </Button>
        <Button
          colorScheme={'red'}
          w={{ base: 'full' }}
          h={{ base: 24, md: '36' }}
          flexDir={'column'}
          gap={{ base: 3, md: 5 }}
          fontSize={{ base: 'lg', md: 'xl' }}
          onClick={() => router.push("/wallet/expenses/add")}
        >
          <Icon as={FiUpload} boxSize={{ base: 5, md: 6 }} />
          Add Expense
        </Button>
      </Flex>

      {(income.data.length > 0 && expense.data.length > 0) && (
        <Link href="/ai">
          <Flex justify={'center'} w={'full'} pt={5}>
            <Button variant={'outline'} colorScheme="green" w={{ base: 'full', md: 'fit-content' }} px={{ md: 12 }}>
              Ask MiTri AI about your financial condition
            </Button>
          </Flex>
        </Link>
      )}
    </Stack>
  )
}