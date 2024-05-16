import { Avatar, Container, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react"

export default function SectionAI() {
  return (
    <Container maxW={'7xl'} py={{ base: 30, md: 10 }}>
      <Stack maxW={'4xl'} textAlign={'center'} mx={'auto'}>
        <Text
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight={'black'}
        >
          &quot;Artifical Inteligence&quot; is the Power Here.
        </Text>
        <Text
          maxW={{ base: 'full', md: '2xl' }}
          mx={'auto'}
          color={useColorModeValue('gray.500', 'gray.400')}
          lineHeight={{ md: '1.8' }}
        >
          Using Mitri Wallet has transformed the way I manage my finances. The AI-driven insights are incredibly accurate and have helped me make better financial decisions. It&apos;s like having a personal financial advisor at your fingertips. Highly recommend to anyone looking to optimize their financial management.
        </Text>

        <Flex justify={'center'} align={'center'} gap={3} py={5}>
          <Avatar name="krisna" />
          <Stack textAlign={'start'} spacing={0}>
            <Text fontSize={'md'} fontWeight={'bold'}>
              Krisna
            </Text>
            <Text fontSize={'sm'} color={useColorModeValue('gray.500', 'gray.400')}>
              Founder of Mitri Wallet
            </Text>
          </Stack>
        </Flex>
      </Stack>
    </Container>
  )
}