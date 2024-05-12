import { Avatar, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import type { User } from "firebase/auth";

export default function ProfileInfo({ user }: { user: User | null }) {
  return (
    <>
      <Avatar
        mt={-6}
        src={user?.photoURL as string}
        name={user?.displayName as string}
        bg={'blue.500'}
        size={'lg'}
        border={'4px'}
        color={useColorModeValue('white', 'gray.700')}
      />

      <Stack spacing={1} w={'full'} textAlign={'center'}>
        <Text fontWeight={'medium'}>
          {user?.displayName || user?.email}
        </Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.500', 'gray.400')}>
          {user?.email}
        </Text>
        {!user?.emailVerified && (
          <Text fontSize={'sm'} color={'red.500'}>
            Please verify your email in profile page *
          </Text>
        )}
      </Stack>
    </>
  )
}
