import { auth } from "@/lib/firebase";
import { Box, Button, Container, Flex, Heading, Icon, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import ProfileMenuNavbar from "@/components/navbar/profile";
import { FaMoon, FaSun } from "react-icons/fa";
import Link from "next/link";

const Unauthenticated = () => {
  return (
    <Flex align={'center'} gap={3}>
      <Link href={'/auth/login'}>
        <Button variant={'outline'} colorScheme="blue" size={'sm'}>
          Sign In
        </Button>
      </Link>
      <Link href={'/auth/register'}>
        <Button colorScheme={'blue'} size={'sm'}>
          Sign Up
        </Button>
      </Link>
    </Flex>
  )
}

export default function Navbar() {
  const user = auth.currentUser;
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.800')}
      pos={'sticky'}
      top={0}
      zIndex={999}
    >
      <Container maxW={'8xl'}>
        <Flex justify={'space-between'} align={'center'} py={4}>
          <Heading fontSize={'2xl'} fontWeight={'black'}>MiTri.</Heading>
          <Flex align={'center'} gap={8}>
            <Link href={'/'}>
              <Text color={useColorModeValue('gray.500', 'gray.300')} _hover={{ color: 'blue.400' }}>
                Home
              </Text>
            </Link>
            <Link href={'/wallet'}>
              <Text color={useColorModeValue('gray.500', 'gray.300')} _hover={{ color: 'blue.400' }}>
                My Wallet
              </Text>
            </Link>

            <Flex align={'center'} gap={3}>
              {colorMode === 'light'
                ? (
                  <Button size={'sm'} onClick={toggleColorMode}>
                    <Icon as={FaMoon} />
                  </Button>
                )
                : (
                  <Button size={'sm'} onClick={toggleColorMode}>
                    <Icon as={FaSun} />
                  </Button>
                )}
              {user
                ? <ProfileMenuNavbar user={user} />
                : <Unauthenticated />
              }
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}