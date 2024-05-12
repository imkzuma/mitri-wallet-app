import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { Button, Flex, FormControl, FormLabel, Input, Skeleton, Stack, Textarea, useColorModeValue } from "@chakra-ui/react";

export default function DetailExpense() {
  const expenses: any = useAppSelector((state: RootState) => state.expenses);
  const formatIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(expenses.data?.amount || 0);

  return (
    <Stack
      w={'full'}
      spacing={5}
      bg={useColorModeValue('white', 'gray.700')}
      p={5}
      rounded={'lg'}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.800')}
    >
      {expenses.isLoading
        ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={20} rounded={'lg'} />
          ))
        )
        : (
          <>
            <FormControl isReadOnly>
              <FormLabel>Amount</FormLabel>
              <Input value={formatIDR} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Expense For</FormLabel>
              <Input value={expenses.data?.to || ''} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Expense Description</FormLabel>
              <Textarea value={expenses.data?.description || ''} />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Expense Date</FormLabel>
              <Input type="date" value={expenses.data?.date || ''} />
            </FormControl>
            <Flex w={'full'} align={'center'} gap={5}>
              <FormControl isReadOnly>
                <FormLabel>Created At</FormLabel>
                <Input type="text" value={expenses.data?.createdAt || ''} />
              </FormControl>
              <FormControl isReadOnly>
                <FormLabel>Updated At</FormLabel>
                <Input type="text" value={expenses.data?.updatedAt || ''} />
              </FormControl>
            </Flex>
            <Flex justify={'end'} pt={5}>
              <Button colorScheme={'blue'} px={12}>Edit</Button>
            </Flex>
          </>
        )
      }
    </Stack>
  )
}