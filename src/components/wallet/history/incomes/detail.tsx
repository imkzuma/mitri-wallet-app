import { useAppSelector } from "@/lib/redux/hooks";
import { RootState } from "@/lib/redux/store";
import { Button, Flex, FormControl, FormLabel, Input, Skeleton, Stack, Textarea, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import ModalEditIncome from "./ModalEdit";

export default function DetailIncome() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const incomes: any = useAppSelector((state: RootState) => state.incomes);
  const formatIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(incomes.data?.amount || 0);

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
      <ModalEditIncome isOpen={isOpen} onClose={onClose} income={incomes.data} />
      {incomes.isLoading
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
            <Flex justify={'end'} pt={5}>
              <Button colorScheme={'blue'} px={12} onClick={onOpen}>Edit</Button>
            </Flex>
          </>
        )
      }
    </Stack>
  )
}