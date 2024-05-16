import { Button, Container, Flex, Input, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  return (
    <Container maxW={'7xl'}>
      <Flex
        minH={'50vh'}
        w={'full'}
        justify={'center'}
        align={'center'}
        direction={'column'}
        py={{ base: 10, md: 8 }}
        px={{ base: 3, md: 0 }}
      >
        <Stack
          maxW={'6xl'}
          textAlign={{ md: 'center' }}
          spacing={3}
          align={{ md: 'center' }}
        >
          <Text color={'blue.500'} fontWeight={'medium'} fontSize={{ base: 'sm', md: 'lg' }}>
            Mini Project - Alterra Academy 2024
          </Text>
          <Text
            fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
            fontWeight={'black'}
            lineHeight={1.3}
          >
            Experience the Future with Mitri-Wallet
            Money Management Powered by AI.
          </Text>
          <Text
            color={useColorModeValue('gray.500', 'gray.400')}
            fontSize={{ base: 'md', md: 'xl' }}
            maxW={'4xl'}
            mx={'auto'}
            textTransform={'capitalize'}
            lineHeight={'1.8'}
          >
            Imagine leveraging
            <Text as="span" color={'blue.500'}> AI </Text>
            to optimize your financial management.
            Upload your data now and see the smart insights.
          </Text>
          <Flex align={'center'}>
            <Link href="/wallet" passHref>
              <Button
                size={'md'}
                fontSize={'sm'}
                colorScheme="blue"
                cursor={'pointer'}
                w={'fit-content'}
                rounded={{ base: 'lg', md: 'xl' }}
                px={{ base: 10, md: 7 }}
                py={{ base: 3, md: 6 }}
              >
                Lets Try it Now
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Flex>
    </Container>
  )
}