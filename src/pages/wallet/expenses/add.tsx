import ExpenseForm from "@/components/wallet/history/forms/expense";
import HistoryUserInfo from "@/components/wallet/history/UserInfo";
import TitleBar, { TitleBarDetail } from "@/components/wallet/TitleBar";
import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { useFirebaseAuth } from "@/lib/firebase/auth";
import { Flex } from "@chakra-ui/react";
import Head from "next/head";

export default function AddExpensesPage() {
  const { user } = useFirebaseAuth();

  return (
    <>
      <Head>
        <title>Mitri | Add Expense</title>
      </Head>

      <ProtectedMainLayout>
        <TitleBarDetail title="Add Expense" onBackHref="/wallet" />
        <Flex py={5} align={'start'} gap={5} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
          <HistoryUserInfo currentUser={user} type="expense" />
          <ExpenseForm />
        </Flex>
      </ProtectedMainLayout>
    </>
  )
}