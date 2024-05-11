import { Heading, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import HistoryIncomes from "@/components/wallet/history/incomes";
import HistoryExpenses from "./expenses";
import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";

export default function WalletHistory() {
  const expenses = useAppSelector((state: RootState) => state.expenses);
  const incomes = useAppSelector((state: RootState) => state.incomes);

  return (
    <Stack spacing={5} py={5}>
      <Heading fontSize={'2xl'}>
        History
      </Heading>
      <Tabs variant={'enclosed'}>
        <TabList mb={4}>
          <Tab px={{ base: 5, md: 12 }}>Income</Tab>
          <Tab px={{ base: 5, md: 12 }}>Expense</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0}>
            {incomes.data.length === 0
              ? (
                <Text textAlign={'center'} fontSize={'lg'}>
                  No incomes yet
                </Text>
              )
              : <HistoryIncomes />
            }
          </TabPanel>
          <TabPanel px={0}>
            {expenses.data.length === 0
              ? (
                <Text textAlign={'center'} fontSize={'lg'}>
                  No expenses yet
                </Text>
              ) : <HistoryExpenses />
            }
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
}
