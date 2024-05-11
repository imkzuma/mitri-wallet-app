import Navbar from "@/components/navbar"
import { useFirebaseAuth } from "@/lib/firebase/auth";
import { Box, Container, Flex, Spinner, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router"

const LoadingScreen = () => {
  return (
    <Flex w={'full'} minH={'100dvh'} justify={'center'} align={'center'}>
      <Spinner size={'xl'} colorScheme="blue" />
    </Flex>
  )
}

export default function ProtectedMainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useFirebaseAuth();
  const bg = useColorModeValue('gray.100', 'gray.900');

  if (isLoading) return <LoadingScreen />

  if (user) {
    return (
      <Box minH={'100dvh'} w={'full'} bg={bg}>
        <Navbar />
        <Container maxW={'5xl'} py={3}>
          {children}
        </Container>
      </Box>
    )
  }

  router.replace("/auth/login");
}