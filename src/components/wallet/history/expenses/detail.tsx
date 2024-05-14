import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { Button, Flex, FormControl, FormLabel, Input, Skeleton, Stack, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import ModalEditExpense from "./ModalEdit";
import { useState } from "react";

export default function DetailExpense() {
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const expenses: any = useAppSelector((state: RootState) => state.expenses);
  const formatIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(expenses.data?.amount || 0);

  const onOpenEdit = () => setShowEdit(true);
  const onCloseEdit = () => setShowEdit(false);

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
      <ModalEditExpense isOpen={showEdit} onClose={onCloseEdit} expense={expenses.data} />

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
            <Flex justify={'end'} pt={{ base: 10, md: 5 }} gap={{ base: 3, md: 5 }} flexDir={{ base: 'column', md: 'row' }}>
              <Button colorScheme={'blue'} px={12} onClick={onOpenEdit}>Edit</Button>
            </Flex>
          </>
        )
      }
    </Stack>
  )
}