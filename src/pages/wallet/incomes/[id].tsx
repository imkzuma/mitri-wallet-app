import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchIncomesEnd, fetchIncomesFailure, fetchIncomesStart, fetchIncomesSuccess } from "@/lib/redux/state/incomes";
import { RootState } from "@/lib/redux/store";
import { useFirebaseAuth } from "@/lib/firebase/auth";
import { getDetailMyIncome } from "@/lib/api/incomes";
import { TitleBarDetail } from "@/components/wallet/TitleBar";
import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import HistoryUserInfo from "@/components/wallet/history/UserInfo";
import DetailIncome from "@/components/wallet/history/incomes/detail";
import { Flex, useToast } from "@chakra-ui/react";

export default function DetailIncomePage() {
  const toast = useToast();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const incomes: any = useAppSelector((state: RootState) => state.incomes);

  const { user } = useFirebaseAuth();
  const { id } = router.query;

  useEffect(() => {
    const fetchDetailIncome = async () => {
      if (!user || typeof id !== 'string') return;

      dispatch(fetchIncomesStart());
      try {
        const response = await getDetailMyIncome(user.uid, id);
        dispatch(fetchIncomesSuccess(response));
      } catch (error: any) {
        dispatch(fetchIncomesFailure(error));
      } finally {
        dispatch(fetchIncomesEnd());
      }
    };

    fetchDetailIncome();
  }, [dispatch, user, id]);

  if (incomes.error) {
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
        <title>Mitri | Detail Income</title>
      </Head>

      <ProtectedMainLayout>
        <TitleBarDetail title="Detail Income" onBackHref="/wallet" />
        <Flex py={5} align={'start'} gap={5}>
          <HistoryUserInfo currentUser={user} type="income" isLoading={incomes.isLoading} />
          <DetailIncome />
        </Flex>
      </ProtectedMainLayout>
    </>
  )
}