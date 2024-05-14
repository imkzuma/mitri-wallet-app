import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { Flex, Heading, Skeleton, Stack, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { TitleBarDetail } from "@/components/wallet/TitleBar";
import FinanceDataFetcher from "@/components/MitriAI/DataFetcher";
import FinancePromptGenerator from "@/components/MitriAI/PromptGenerator";
import { useAppSelector } from "@/lib/redux/hooks";

export default function AiPage() {
  const incomes = useAppSelector((state) => state.incomes);
  const expenses = useAppSelector((state) => state.expenses);

  return (
    <>
      <Head>
        <title>Mitri AI</title>
      </Head>
      <ProtectedMainLayout>
        <FinanceDataFetcher />

        <Stack spacing={5} py={5}>
          <TitleBarDetail title="AI Analytics Wallet" onBackHref="/wallet" />
          <Flex
            bg={useColorModeValue('white', 'gray.700')}
            p={5}
            rounded={'lg'}
            border={'1px'}
            borderColor={useColorModeValue('gray.200', 'gray.800')}
          >
            <Heading fontSize={'2xl'}>MiTri AI</Heading>
          </Flex>

          {incomes.isLoading || expenses.isLoading
            ? <Skeleton height={'30rem'} rounded={'lg'} />
            : <FinancePromptGenerator />
          }
        </Stack>
      </ProtectedMainLayout>
    </>
  );
}