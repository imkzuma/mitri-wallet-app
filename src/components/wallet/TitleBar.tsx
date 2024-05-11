import { Box, Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import Link from "next/link";

export default function TitleBar({ title }: { title: string }) {
  const router = useRouter();

  return (
    <Flex justify="space-between" align="center" pb={8}>
      <Button p={0} h="fit-content" bg="none" _hover={{ bg: 'none' }} onClick={() => router.push('/wallet')}>
        <Icon as={FaChevronLeft} boxSize={4} />
      </Button>
      <Heading fontSize="2xl">
        {title}
      </Heading>
      <Button p={0} variant="unstyled" visibility="hidden">
        <Icon as={FaChevronLeft} boxSize={4} />
      </Button>
    </Flex>
  );
}

export function TitleBarDetail({ title, onBackHref }: { title: string, onBackHref: string }) {
  return (
    <Box w={'fit-content'} py={5}>
      <Link href={onBackHref}>
        <Flex align={'center'} p={0} gap={4}>
          <Icon as={FaChevronLeft} boxSize={4} />
          <Heading fontSize="lg">
            {title}
          </Heading>
        </Flex>
      </Link>
    </Box>
  )
}
