import DetailIncome from "@/components/wallet/history/incomes/detail";
import HistoryUserInfo from "@/components/wallet/history/UserInfo";
import { TitleBarDetail } from "@/components/wallet/TitleBar";
import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { getDetailMyIncome } from "@/lib/api/incomes";
import { auth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { fetchIncomesEnd, fetchIncomesFailure, fetchIncomesStart, fetchIncomesSuccess } from "@/lib/redux/state/incomes";
import { RootState } from "@/lib/redux/store";
import { Avatar, Badge, Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Icon, Input, Stack, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";


export default function DetailIncomePage() {
  const incomes: any = useAppSelector((state: RootState) => state.incomes);
  const dispatch = useAppDispatch();

  const user = auth.currentUser;
  const router = useRouter();
  const { id } = router.query;


  const fetchDetailIncome = async () => {
    if (!user?.uid || typeof id !== 'string') return;

    dispatch(fetchIncomesStart());
    try {
      const response = await getDetailMyIncome(user.uid, id);
      dispatch(fetchIncomesSuccess(response));
    } catch (error: any) {
      console.error(error);
      dispatch(fetchIncomesFailure(error.message));
    } finally {
      dispatch(fetchIncomesEnd());
    }
  };

  useEffect(() => {
    fetchDetailIncome();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user, id]);

  if (incomes.error) router.replace("/wallet");
  if (incomes.isLoading) return <p>Loading...</p>


  return (
    <>
      <Head>
        <title>Mitri | Detail Income</title>
      </Head>

      <ProtectedMainLayout>
        <TitleBarDetail title="Detail Income" onBackHref="/wallet" />

        <Flex py={5} align={'start'} gap={5}>
          <HistoryUserInfo currentUser={user} type="income" />
          <DetailIncome />
        </Flex>
      </ProtectedMainLayout>
    </>
  )
}