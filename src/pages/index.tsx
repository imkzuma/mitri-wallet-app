import Head from "next/head";
import { Box, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";
import UnprotectedMainLayout from "@/layouts/UnprotectedLayout";
import Hero from "@/components/home/hero";
import HeroImage from "@/components/home/hero/heroImage";
import SectionStack from "@/components/home/stack";
import SectionAI from "@/components/home/ai";

export default function Home() {
  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <UnprotectedMainLayout>
        <Box h={'90vh'} bg={useColorModeValue('white', 'gray.900')}>
          <Box pos={'absolute'} zIndex={0}>
            <Image as="img"
              src="/hero-white.png"
              alt="hero"
              w={'full'}
              h={{ base: '100dvh', md: '70dvh' }}
              objectFit="cover"
              display={colorMode === 'light' ? 'block' : 'none'}
            />
            <Image as="img"
              src="/hero-dark.png"
              alt="hero"
              w={'full'}
              h={{ base: '100dvh', md: '70dvh' }}
              objectFit="cover"
              display={colorMode === 'light' ? 'none' : 'block'}
            />
          </Box>

          <Box pos={'relative'} zIndex={0}>
            <Hero />
            <HeroImage />
          </Box>
        </Box>

        <Box pt={{ base: '30rem', sm: '25rem', md: '50dvh' }} bg={useColorModeValue('gray.50', 'gray.800')}>
          <SectionAI />
          <SectionStack />
        </Box>
      </UnprotectedMainLayout>
    </>
  )
}