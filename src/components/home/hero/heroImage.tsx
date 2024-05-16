import { Image, useColorMode } from "@chakra-ui/react";

export default function HeroImage() {
  const { colorMode } = useColorMode();
  return (
    <>
      <Image as="img"
        src="/mobile/hero-white.png"
        alt="hero"
        mt={{ base: 0, md: -4 }}
        w={'sm'}
        mx={'auto'}
        px={{ base: 3, md: 0 }}
        display={colorMode === 'light' ? 'block' : 'none'}
      />
      <Image as="img"
        src="/mobile/hero-dark.png"
        alt="hero"
        mt={{ base: 0, md: -4 }}
        w={'sm'}
        mx={'auto'}
        px={{ base: 3, md: 0 }}
        display={colorMode === 'light' ? 'none' : 'block'}
      />
    </>
  )
}