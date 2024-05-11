import { useAppSelector } from "@/lib/redux/hooks";
import { IncomesProps } from "@/lib/redux/state/incomes";
import { Skeleton, Stack, Text } from "@chakra-ui/react";
import IncomeGroups from "@/components/wallet/history/incomes/IncomeGroups";
import IncomeItems from "@/components/wallet/history/incomes/IncomeItems";

interface GroupedIncomes { [date: string]: IncomesProps[]; }

export default function HistoryIncomes() {
  const incomes = useAppSelector((state) => state.incomes);

  const groupedIncomes = incomes.data && Array.isArray(incomes.data)
    ? incomes.data.reduce((acc: GroupedIncomes, item: IncomesProps) => {
      const date = item.date;

      if (!acc[date]) acc[date] = [];
      acc[date].push(item);

      return acc;
    }, {})
    : {};

  return (
    <Stack spacing={5}>
      {incomes.isLoading
        ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={12} rounded={'lg'} />
          ))
        )
        : (

          Object.keys(groupedIncomes).map((date) => (
            <IncomeGroups key={date} date={date}>
              {groupedIncomes[date].map((item: IncomesProps) => (
                <IncomeItems key={item.id} item={item} />
              ))}
            </IncomeGroups>
          ))
        )
      }
    </Stack >
  )
}