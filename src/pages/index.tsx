import Head from "next/head";
import { Heading, Text } from "@chakra-ui/react";
import UnprotectedMainLayout from "@/layouts/UnprotectedLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <UnprotectedMainLayout>
        <Heading>Hello, world!</Heading>
        <Text fontSize="xl" fontWeight="bold">Hello, world!</Text>
      </UnprotectedMainLayout>
    </>
  )
}