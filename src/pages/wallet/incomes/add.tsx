import IncomeForm from "@/components/wallet/history/forms/income";
import TitleBar from "@/components/wallet/TitleBar";
import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { Container } from "@chakra-ui/react";
import Head from "next/head";

export default function AddIncomesPage() {
  return (
    <>
      <Head>
        <title>Mitri | Add Income</title>
      </Head>

      <ProtectedMainLayout>
        <Container py={5}>
          <TitleBar title="Add Income" />
          <IncomeForm />
        </Container>
      </ProtectedMainLayout>
    </>
  )
}