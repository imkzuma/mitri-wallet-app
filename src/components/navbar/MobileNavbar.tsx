import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export default function MobileNavbar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={'left'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading fontSize={'2xl'} fontWeight={'black'}>MiTri.</Heading>
        </DrawerHeader>
        <DrawerBody>
          <Flex gap={5} flexDir={'column'} py={5}>
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}