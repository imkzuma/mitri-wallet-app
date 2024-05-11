import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { getDetailMyExpense } from "@/lib/api/expense";
import { auth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchExpensesEnd, fetchExpensesFailure, fetchExpensesStart, fetchExpensesSuccess } from "@/lib/redux/state/expenses";
import { RootState } from "@/lib/redux/store";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DetailExpensePage() {
  const expenses = useAppSelector((state: RootState) => state.expenses);
  const dispatch = useAppDispatch();

  const uid = auth.currentUser?.uid;
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchDetailExpense = async () => {
      if (!uid || typeof id !== 'string') return;

      dispatch(fetchExpensesStart());
      try {
        const response = await getDetailMyExpense(uid, id);
        console.log(response);
        dispatch(fetchExpensesSuccess(response));
      } catch (error: any) {
        console.error(error);
        dispatch(fetchExpensesFailure(error.message));
      } finally {
        dispatch(fetchExpensesEnd());
      }
    };

    fetchDetailExpense();

  }, [uid, id, dispatch]);

  if (expenses.error) router.replace("/wallet");
  if (expenses.isLoading) return <p>Loading...</p>

  return (
    <>
      <Head>
        <title>Mitri | Detail Expense</title>
      </Head>

      <ProtectedMainLayout>
        <h1>Detail Expense Page</h1>
        <p>Detail Expense Page {id}</p>
      </ProtectedMainLayout>
    </>
  )
}