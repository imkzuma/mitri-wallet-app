import { useEffect } from "react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { getMyExpenses } from "@/lib/api/expense";
import { getMyIncomes } from "@/lib/api/incomes";
import { fetchExpensesEnd, fetchExpensesFailure, fetchExpensesStart, fetchExpensesSuccess } from "@/lib/redux/state/expenses";
import { fetchIncomesEnd, fetchIncomesFailure, fetchIncomesStart, fetchIncomesSuccess } from "@/lib/redux/state/incomes";
import { useFirebaseAuth } from "@/lib/firebase/auth";

export default function FinanceDataFetcher() {
  const dispatch = useAppDispatch();
  const { user } = useFirebaseAuth();

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

  return null;
}