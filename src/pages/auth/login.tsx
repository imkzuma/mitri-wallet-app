import LoginComponent from "@/components/auth/login";
import AuthLayout from "@/layouts/AuthLayout";
import { Text } from "@chakra-ui/react";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Mitri Wallet App | Login</title>
      </Head>

      <AuthLayout>
        <Text align={'center'} fontSize={'3xl'} fontWeight={'bold'} pb={8}>
          Login Page
        </Text>
        <LoginComponent />
      </AuthLayout>
    </>
  )
}