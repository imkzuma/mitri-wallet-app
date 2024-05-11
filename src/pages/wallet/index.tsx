import Head from "next/head";
import { useEffect } from "react";
import WalletStatistic from "@/components/stats";
import WalletHistory from "@/components/wallet/history";
import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { getMyExpenses } from "@/lib/api/expense";
import { getMyIncomes } from "@/lib/api/incomes";
import { useAppDispatch } from "@/lib/redux/hooks";
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

export default function WalletPage() {
  const dispatch = useAppDispatch();
  const { user } = useFirebaseAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      dispatch(fetchExpensesStart());
      dispatch(fetchIncomesStart());

      try {
        const expenses = await getMyExpenses(user.uid);
        dispatch(fetchExpensesSuccess(expenses));
      } catch (expensesError: any) {
        dispatch(fetchExpensesFailure(expensesError.message));
      } finally {
        dispatch(fetchExpensesEnd());
      }

      try {
        const incomes = await getMyIncomes(user.uid);
        dispatch(fetchIncomesSuccess(incomes));
      } catch (incomesError: any) {
        dispatch(fetchIncomesFailure(incomesError.message));
      } finally {
        dispatch(fetchIncomesEnd());
      }
    };

    fetchData();
  }, [dispatch, user]);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <ProtectedMainLayout>
        <WalletStatistic />
        <WalletHistory />
      </ProtectedMainLayout>
    </>
  )
}
