import { Box, Container, Flex, Image, Stack, Text, useColorModeValue } from "@chakra-ui/react";

const stacks = [
  {
    id: 1,
    name: 'Typescript',
    image: 'typescript.png',
    hasbg: true,
    category: 'Frontend Web Development',
    description: 'TypeScript is a superset of JavaScript that compiles to clean JavaScript output.'
  },
  {
    id: 3,
    name: 'Chakra UI',
    image: 'chakra.png',
    hasbg: true,
    category: 'Frontend Web Development',
    description: 'Chakra UI is a modular, accessible component library for building React applications.'
  },
  {
    id: 4,
    name: 'Firebase',
    image: 'firebase.png',
    hasbg: false,
    category: 'Backend Development',
    description: 'Firebase is a platform developed by Google for creating mobile and web applications. It provides a real-time database and backend as a service.'
  },
  {
    id: 5,
    name: 'Next.js',
    image: 'next.png',
    hasbg: false,
    category: 'Frontend Web Development',
    description: 'Next.js is a React-based framework that enables server-side rendering and generates static websites.'
  },
  {
    id: 6,
    name: 'Gemini AI',
    image: 'gemini.webp',
    hasbg: true,
    category: 'AI Development',
    description: 'Gemini AI is an advanced artificial intelligence platform designed for predictive analytics and machine learning applications.'
  },
  {
    id: 7,
    name: 'React',
    image: 'react.png',
    hasbg: false,
    category: 'Frontend Web Development',
    description: 'React is a JavaScript library for building user interfaces, maintained by Facebook and a community of individual developers and companies.'
  }
];

export default function SectionStack() {
  const bgImgStack = useColorModeValue('white', 'gray.200');
  const bgStack = useColorModeValue('white', 'gray.700');
  const borderStackColor = useColorModeValue('gray.200', 'gray.700');
  const textSecondaryColor = useColorModeValue('gray.500', 'gray.300');
  const titleSecondary = useColorModeValue('gray.500', 'gray.400');

  return (
    <Container maxW={'7xl'} py={14}>
      <Flex px={{ base: 3, md: 0 }} flexWrap={'wrap'} gap={5} justify={'center'}>
        {stacks.map((stack, index) => (
          <Stack key={index}
            w={{ base: 'full', md: '300px', lg: '310px' }}
            spacing={4}
            bg={bgStack}
            rounded={'lg'}
            shadow={'inset 0 1px 0 0 #ffffff0d'}
            border={'1px'}
            p={5}
            borderColor={borderStackColor}
          >
            <Flex gap={3} align={'center'}>
              <Flex
                w={10} h={10}
                align={'center'}
                bg={!stack.hasbg ? bgImgStack : 'transparent'}
                rounded={'lg'}
              >
                <Image
                  src={`/stack/${stack.image}`}
                  alt={stack.name}
                  w={10}
                />
              </Flex>
              <Stack spacing={1}>
                <Text fontWeight={'medium'}>
                  {stack.name}
                </Text>
                <Text fontSize={'xs'}
                  color={titleSecondary}
                >
                  {stack.category}
                </Text>
              </Stack>
            </Flex>
            <Text
              fontSize={'sm'}
              color={textSecondaryColor}
              lineHeight={1.7}
            >
              {stack.description}
            </Text>
          </Stack>
        ))}
      </Flex>
    </Container>
  )
}