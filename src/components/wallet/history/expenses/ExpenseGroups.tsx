import { Stack, Text } from "@chakra-ui/react";

export default function ExpenseGroups({ date, children }: { date: string, children: React.ReactNode }) {
  return (
    <Stack key={date} spacing={4}>
      <Text ps={2}>{date}</Text>
      <Stack> {children} </Stack>
    </Stack>
  )
}
