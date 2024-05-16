import { Box, Button, Container, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function SectionAsked() {
  return (
    <Container maxW={'7xl'} pt={24}>
      <Stack
        align={'center'}
        textAlign={'center'}
        maxW={{ base: 'full', md: '3xl' }}
        mx={'auto'}
        spacing={3}
        px={{ base: 3, md: 0 }}
      >
        <Text
          fontSize={{ base: '2xl', md: '4xl', lg: '5xl' }}
          fontWeight={'black'}
        >
          The Place for anyone from anywhere to share anything.
        </Text>
        <Text
          maxW={{ base: 'full', md: '2xl' }}
          mx={'auto'}
          color={useColorModeValue('gray.500', 'gray.400')}
          fontSize={{ base: 'md', md: 'lg' }}
          textTransform={'capitalize'}
          lineHeight={'1.8'}
          pb={5}
        >
          Let us know if you have any issues or questions. We&apos;ll get back to you as soon as possible.
          Your feedback is important to develop our application.
        </Text>

        <Button as="a"
          href="mailto:edu.gungkrisna@gmail.com"
          size={'md'}
          fontSize={'md'}
          colorScheme="blue"
          cursor={'pointer'}
          w={'fit-content'}
          rounded={{ base: 'lg', md: 'xl' }}
          px={{ base: 10 }}
          py={{ base: 3, md: 6 }}
        >
          Contact Me
        </Button>
      </Stack>
    </Container>
  )
}