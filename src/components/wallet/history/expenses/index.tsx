import { useAppSelector } from "@/lib/redux/hooks";
import { Skeleton, Stack, Text } from "@chakra-ui/react";
import ExpenseGroups from "@/components/wallet/history/expenses/ExpenseGroups";
import ExpenseItems from "@/components/wallet/history/expenses/ExpenseItems";
import { ExpensesProps, fetchExpensesEnd, fetchExpensesFailure, fetchExpensesStart, fetchExpensesSuccess } from "@/lib/redux/state/expenses";

interface GroupedExpenses { [date: string]: ExpensesProps[]; }

export default function HistoryExpenses() {
  const expenses = useAppSelector((state) => state.expenses);

  const groupedExpenses = expenses.data && Array.isArray(expenses.data)
    ? expenses.data.reduce((acc: GroupedExpenses, item: ExpensesProps) => {
      const date = item.date;

      if (!acc[date]) acc[date] = [];
      acc[date].push(item);

      return acc;
    }, {})
    : {};

  return (
    <Stack spacing={5}>
      {expenses.isLoading
        ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={12} rounded={'lg'} />
          ))
        )
        : (
          Object.keys(groupedExpenses).map((date) => (
            <ExpenseGroups key={date} date={date}>
              {groupedExpenses[date].map((item: ExpensesProps) => (
                <ExpenseItems key={item.id} item={item} />
              ))}
            </ExpenseGroups>
          ))
        )
      }
    </Stack>
  )
}