import { Container, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <Container as="footer" maxW={'7xl'} py={12} >
      <Flex
        w={'full'}
        justify={{ base: 'center', lg: 'space-between' }}
        flexWrap={'wrap-reverse'}
        align={'center'}
        gap={{ base: 8, lg: 0 }}
        py={10}
      >
        <Stack as="article"
          w={{ base: 'full', md: '800px' }}
          spacing={5}
        >
          <Text as="p"
            color={useColorModeValue('gray.500', 'gray.400')}
            fontSize={'md'}
            textAlign={{ base: 'center', lg: 'start' }}
            lineHeight={'1.8'}
          >
            &copy;{date} MiTri | Thank you for using MiTri. Copyright
            and our trademarks are protected by intellectual property laws and registered
            at relevant institutions in Indonesia.
          </Text>
        </Stack>

        <Flex align={'center'} gap={4}>
          <Heading fontWeight={'black'}>
            MiTri
          </Heading>
          <Stack spacing={0}>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight={'bold'}
              color={'blue.500'}
            >
              MiTri Wallet App.
            </Text>
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              Mini Project - 2024
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </Container>
  )
}