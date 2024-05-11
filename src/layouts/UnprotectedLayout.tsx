import Navbar from "@/components/navbar"
import { useFirebaseAuth } from "@/lib/firebase/auth";
import { Box, Container, Flex, Spinner, useColorModeValue } from "@chakra-ui/react"

const LoadingScreen = () => {
  return (
    <Flex w={'full'} minH={'100dvh'} justify={'center'} align={'center'}>
      <Spinner size={'xl'} colorScheme="blue" />
    </Flex>
  )
}

export default function UnprotectedMainLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useFirebaseAuth();
  const bg = useColorModeValue('gray.100', 'gray.900');

  if (isLoading) return <LoadingScreen />

  return (
    <Box minH={'100dvh'} w={'full'} bg={bg}>
      <Navbar />
      <Container maxW={"8xl"}>
        {children}
      </Container>
    </Box>
  )
}