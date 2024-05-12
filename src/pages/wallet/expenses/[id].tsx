import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { useFirebaseAuth } from "@/lib/firebase/auth";
import { TitleBarDetail } from "@/components/wallet/TitleBar";
import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import HistoryUserInfo from "@/components/wallet/history/UserInfo";
import { Flex, useToast } from "@chakra-ui/react";
import { getDetailMyExpense } from "@/lib/api/expense";
import { fetchExpensesEnd, fetchExpensesFailure, fetchExpensesStart, fetchExpensesSuccess } from "@/lib/redux/state/expenses";
import DetailExpense from "@/components/wallet/history/expenses/detail";

export default function DetailExpensePage() {
  const toast = useToast();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const expenses: any = useAppSelector((state: RootState) => state.expenses);

  const { user } = useFirebaseAuth();
  const { id } = router.query;

  useEffect(() => {
    const fetchDetailExpense = async () => {
      if (!user || typeof id !== 'string') return;

      dispatch(fetchExpensesStart());
      try {
        const response = await getDetailMyExpense(user.uid, id);
        dispatch(fetchExpensesSuccess(response));
      } catch (error: any) {
        dispatch(fetchExpensesFailure(error));
      } finally {
        dispatch(fetchExpensesEnd());
      }
    };

    fetchDetailExpense();
  }, [dispatch, user, id]);

  if (expenses.error) {
    router.replace('/wallet');
    toast.closeAll();

    return toast({
      title: "Error",
      description: "Not data found!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right"
    });
  }

  return (
    <>
      <Head>
        <title>Mitri | Detail Expense</title>
      </Head>

      <ProtectedMainLayout>
        <TitleBarDetail title="Detail Expense" onBackHref="/wallet" />
        <Flex py={5} align={'start'} gap={5} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
          <HistoryUserInfo currentUser={user} type="expense" isLoading={expenses.isLoading} />
          <DetailExpense />
        </Flex>
      </ProtectedMainLayout>
    </>
  )
}