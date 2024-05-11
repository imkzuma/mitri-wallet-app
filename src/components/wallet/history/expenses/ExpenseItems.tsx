import Link from "next/link";
import { Button, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalDeleteExpense from "./ModalDelete";
import { ExpensesProps } from "@/lib/redux/state/expenses";

interface IncomesItemsProps extends Omit<ExpensesProps, 'description' | 'createdAt' | 'updatedAt'> { };

export default function ExpenseItems({ item }: { item: IncomesItemsProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formatIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount);

  return (
    <Flex
      bg={useColorModeValue('white', 'gray.700')}
      px={5} py={3}
      justify={'space-between'}
      rounded={'lg'}
      transition='all 0.3s ease'
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.800')}
      _hover={{
        bg: useColorModeValue('blue.100', 'blue.500'),
        transition: 'all 0.3s ease'
      }}
      alignItems="center"
      cursor="pointer"
    >
      <ModalDeleteExpense isOpen={isOpen} onClose={onClose} id={item.id} />
      <Link
        key={item.id}
        href={{
          pathname: `/wallet/expenses/[id]`,
          query: { id: item.id }
        }}
        prefetch
        style={{ width: '100%' }}
      >
        <Flex gap={2}>
          <Text fontSize={'lg'}>
            -
          </Text>
          <Stack spacing={1}>
            <Text fontWeight={'bold'}>
              {formatIDR}
            </Text>
            <Text
              fontStyle={'italic'}
              color={useColorModeValue('gray.500', 'gray.300')}
            >
              {item.to}
            </Text>
          </Stack>
        </Flex>
      </Link>
      <Menu>
        <MenuButton as={Button} variant={'ghost'}>
          <Icon as={BsThreeDotsVertical} />
        </MenuButton>
        <MenuList>
          <MenuItem>Edit</MenuItem>
          <MenuItem color={'red'} onClick={onOpen}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}