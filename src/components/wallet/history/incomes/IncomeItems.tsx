import Link from "next/link";
import { IncomesProps } from "@/lib/redux/state/incomes";
import { Button, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ModalDeleteIncome from "./ModalDelete";
import { useState } from "react";
import ModalEditIncome from "./ModalEdit";

export default function IncomeItems({ item }: { item: IncomesProps }) {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  const formatIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount);

  const onOpenDelete = () => setShowDelete(true);
  const onCloseDelete = () => setShowDelete(false);

  const onOpenEdit = () => setShowEdit(true);
  const onCloseEdit = () => setShowEdit(false);

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
      <ModalDeleteIncome isOpen={showDelete} onClose={onCloseDelete} id={item.id} />
      <ModalEditIncome isOpen={showEdit} onClose={onCloseEdit} income={item} />
      <Link
        key={item.id}
        href={{
          pathname: `/wallet/incomes/[id]`,
          query: { id: item.id }
        }}
        prefetch
        style={{ width: '100%' }}
      >
        <Flex gap={2}>
          <Text fontSize={'lg'}>
            +
          </Text>
          <Stack spacing={1}>
            <Text fontWeight={'bold'}>
              {formatIDR}
            </Text>
            <Text
              fontStyle={'italic'}
              color={useColorModeValue('gray.500', 'gray.300')}
            >
              {item.from}
            </Text>
          </Stack>
        </Flex>
      </Link>
      <Menu>
        <MenuButton as={Button} variant={'ghost'}>
          <Icon as={BsThreeDotsVertical} />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpenEdit}>Edit</MenuItem>
          <MenuItem color={'red'} onClick={onOpenDelete}>Delete</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  )
}