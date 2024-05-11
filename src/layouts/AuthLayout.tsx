import { useFirebaseAuth } from "@/lib/firebase/auth";
import { Flex, Spinner, Stack, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

const LoadingScreen = () => {
  return (
    <Flex w={'full'} minH={'100dvh'} justify={'center'} align={'center'}>
      <Spinner size={'xl'} colorScheme="blue" />
    </Flex>
  )
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useFirebaseAuth();
  const bg = useColorModeValue('white', 'gray.900');

  if (isLoading) return <LoadingScreen />

  if (!user) {
    return (
      <Flex w={'full'} minH={'100dvh'} justify={'center'} align={'center'} bg={bg}>
        <Stack w={'sm'} px={{ base: 5, md: 3 }}>
          {children}
        </Stack>
      </Flex>
    )
  }

  router.replace("/");
}