import Footer from "@/components/footer";
import SectionAsked from "@/components/home/asked";
import Navbar from "@/components/navbar"
import { useFirebaseAuth } from "@/lib/firebase/auth";
import { Box, Container, Flex, Image, Spinner, useColorModeValue } from "@chakra-ui/react"

const LoadingScreen = () => {
  return (
    <Flex w={'full'} minH={'100dvh'} justify={'center'} align={'center'}>
      <Spinner size={'xl'} colorScheme="blue" />
    </Flex>
  )
}

export default function UnprotectedMainLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useFirebaseAuth();
  const bg = useColorModeValue('white', 'gray.800');
  const bgFooter = useColorModeValue('gray.50', 'gray.900');

  if (isLoading) return <LoadingScreen />

  return (
    <Flex
      w={'full'}
      minH={'100dvh'}
      direction={'column'}
    >
      <Navbar />

      <Box as="main"
        bg={bg}
        flex={1}
      >
        {children}
      </Box>

      <Box pos={'relative'} zIndex={0}>
        <SectionAsked />
        <Box
          w={{ base: 'full', sm: 'md' }}
          mx={'auto'}
        >
          <Image src="/astrocat.png" alt="astrocat" objectFit={'cover'} />
        </Box>
        <Box bg={bgFooter} mt={-10}>
          <Footer />
        </Box>
      </Box>
    </Flex>
  )
}