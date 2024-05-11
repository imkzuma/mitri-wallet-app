import RegisterComponent from "@/components/auth/register";
import AuthLayout from "@/layouts/AuthLayout";
import { Text } from "@chakra-ui/react";
import Head from "next/head";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Mitri Wallet App | Register</title>
      </Head>

      <AuthLayout>
        <Text align={'center'} fontSize={'3xl'} fontWeight={'bold'} pb={8}>
          Register Page
        </Text>
        <RegisterComponent />
      </AuthLayout>
    </>
  )
}