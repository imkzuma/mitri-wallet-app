import HistoryUserInfo from "@/components/wallet/history/UserInfo";
import { TitleBarDetail } from "@/components/wallet/TitleBar";
import ProtectedMainLayout from "@/layouts/ProtectedLayout";
import { useFirebaseAuth } from "@/lib/firebase/auth"
import { Alert, AlertDescription, AlertIcon, Button, CloseButton, Flex, FormControl, FormLabel, Input, Stack, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";

const NotVerifiedAlert = ({ onClose }: { onClose: () => void }) => (
  <Alert status='warning' display={'flex'} justifyContent={'space-between'}>
    <Flex align={'center'} gap={{ md: 3 }}>
      <AlertIcon />
      <AlertDescription fontSize={{ base: 'sm', md: 'md' }}>
        Please verify your email address to verify your account.
      </AlertDescription>
    </Flex>
    <CloseButton
      alignSelf='flex-start'
      position='relative'
      right={-1}
      top={-1}
      onClick={onClose}
    />
  </Alert>
);

const UserDetail = ({ user }: { user: any }) => (
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
      <FormLabel>UID</FormLabel>
      <Input value={user?.uid as string} />
    </FormControl>
    <FormControl isReadOnly>
      <FormLabel>Username</FormLabel>
      <Input value={user?.displayName as string} />
    </FormControl>
    <FormControl isReadOnly>
      <FormLabel>Email</FormLabel>
      <Input value={user?.email as string} />
    </FormControl>
    <FormControl isReadOnly>
      <FormLabel>Phone Number</FormLabel>
      <Input value={user?.phoneNumber as string || "-"} />
    </FormControl>
    <Flex w={'full'} align={'center'} gap={5}>
      <FormControl isReadOnly>
        <FormLabel>Created At</FormLabel>
        <Input type="text" value={user?.metadata.creationTime || ''} />
      </FormControl>
      <FormControl isReadOnly>
        <FormLabel>Updated At</FormLabel>
        <Input type="text" value={user?.metadata.lastSignInTime || ''} />
      </FormControl>
    </Flex>
  </Stack>
);

export default function ProfilePage() {
  const { user, isLoading } = useFirebaseAuth();
  const { isOpen: isVisible, onClose, } = useDisclosure({ defaultIsOpen: true })

  return (
    <>
      <Head>
        <title>Mitri | Profile</title>
      </Head>

      {(!user?.emailVerified && isVisible) && <NotVerifiedAlert onClose={onClose} />}

      <ProtectedMainLayout>
        <TitleBarDetail title="Profile Page" onBackHref="/wallet" />
        <Flex py={5} align={'start'} gap={5} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
          <Stack spacing={5}>
            <HistoryUserInfo currentUser={user} type="profile" isLoading={isLoading} />
            {!user?.emailVerified && (
              <Button colorScheme="blue" rounded={'lg'} size={'sm'} variant={'outline'}>
                Verify Email
              </Button>
            )}
          </Stack>
          <UserDetail user={user} />
        </Flex>
      </ProtectedMainLayout>
    </>
  )
}