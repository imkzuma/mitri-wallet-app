import IncomeForm from "@/components/wallet/history/forms/income";
import HistoryUserInfo from "@/components/wallet/history/UserInfo";
import TitleBar, { TitleBarDetail } from "@/components/wallet/TitleBar";
import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { useFirebaseAuth } from "@/lib/firebase/auth";
import { Container, Flex } from "@chakra-ui/react";
import Head from "next/head";

export default function AddIncomesPage() {
  const { user } = useFirebaseAuth();

  return (
    <>
      <Head>
        <title>Mitri | Add Income</title>
      </Head>

      <ProtectedMainLayout>
        <TitleBarDetail title="Add Income" onBackHref="/wallet" />
        <Flex py={5} align={'start'} gap={5} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
          <HistoryUserInfo currentUser={user} type="income" />
          <IncomeForm />
        </Flex>
      </ProtectedMainLayout>
    </>
  )
}