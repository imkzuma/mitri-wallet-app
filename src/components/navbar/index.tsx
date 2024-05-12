import { auth } from "@/lib/firebase";
import { Box, Button, Container, Flex, Heading, Icon, Text, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import ProfileMenuNavbar from "@/components/navbar/profile";
import { FaMoon, FaSun } from "react-icons/fa";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import MobileNavbar from "./MobileNavbar";

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

  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <MobileNavbar isOpen={isOpen} onClose={onClose} />

      <Container maxW={'8xl'}>
        <Flex justify={'space-between'} align={'center'} py={4}>
          <Flex align={'center'} gap={3}>
            <Button variant={'ghost'} size={'sm'} p={0} display={{ base: 'flex', md: 'none' }} onClick={onOpen}>
              <Icon as={BiMenu} boxSize={7} />
            </Button>
            <Heading fontSize={'2xl'} fontWeight={'black'}>MiTri.</Heading>
          </Flex>
          <Flex align={'center'} gap={8}>
            <Flex align={'center'} gap={8} display={{ base: 'none', md: 'flex' }}>
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
            </Flex>

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