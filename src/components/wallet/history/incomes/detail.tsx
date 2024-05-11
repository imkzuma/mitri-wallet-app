import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { Flex, FormControl, FormLabel, Input, Stack, Textarea, useColorModeValue } from "@chakra-ui/react";

export default function DetailIncome() {
  const incomes: any = useAppSelector((state: RootState) => state.incomes);

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
      <FormControl isReadOnly>
        <FormLabel>Amount</FormLabel>
        <Input type="number" value={incomes.data?.amount || ''} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel>Income Source</FormLabel>
        <Input value={incomes.data?.from || ''} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel>Income Description</FormLabel>
        <Textarea value={incomes.data?.description || ''} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel>Income Date</FormLabel>
        <Input type="date" value={incomes.data?.date || ''} />
      </FormControl>
      <Flex w={'full'} align={'center'} gap={5}>
        <FormControl isReadOnly>
          <FormLabel>Created At</FormLabel>
          <Input type="text" value={incomes.data?.createdAt || ''} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Updated At</FormLabel>
          <Input type="text" value={incomes.data?.updatedAt || ''} />
        </FormControl>
      </Flex>
    </Stack>
  )
}