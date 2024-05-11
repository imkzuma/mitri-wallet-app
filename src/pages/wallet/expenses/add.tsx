import ExpenseForm from "@/components/wallet/history/forms/expense";
import TitleBar from "@/components/wallet/TitleBar";
import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { Container } from "@chakra-ui/react";
import { Formik } from "formik";
import Head from "next/head";

export default function AddExpensesPage() {
  return (
    <>
      <Head>
        <title>Mitri | Add Expense</title>
      </Head>

      <ProtectedMainLayout>
        <Container py={5}>
          <TitleBar title="Add Expense" />
          <ExpenseForm />
        </Container>
      </ProtectedMainLayout>
    </>
  )
}