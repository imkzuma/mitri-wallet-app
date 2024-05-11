import { LoginSchema } from "@/schema/auth";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Link, Stack, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import GoogleLoginButton from "./GoogleLogin";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/firebase/auth";
import { getFirebaseAuthErrorMessage } from "@/lib/firebase/dto";
import { InputPassword } from "./InputPassword";

interface LoginProps {
  email: string;
  password: string;
};

const Divider = () => {
  return (
    <Flex align="center" gap={5}>
      <Box flex="1" h="1px" bg={useColorModeValue("gray.300", "gray.700")} />
      <Text>OR</Text>
      <Box flex="1" h="1px" bg={useColorModeValue("gray.300", "gray.700")} />
    </Flex>
  )
}

export default function LoginComponent() {
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ email, password }: LoginProps) => {
    setIsLoading(true);
    try {
      const response = await signIn(email, password);
      router.replace("/");
      return toast({
        title: "Success",
        description: `Selamat Datang, ${response?.user?.displayName}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right"
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = getFirebaseAuthErrorMessage(error);

        return toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik initialValues={{ email: "", password: "" }} validationSchema={LoginSchema} onSubmit={handleSubmit}>
      {({ handleSubmit, errors, touched, values }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={5}>
            <FormControl isRequired isInvalid={!!errors.email && touched.email}>
              <FormLabel>Email</FormLabel>
              <Field as={Input} id="email" type="email" placeholder="Input your email" name="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.password && touched.password}>
              <FormLabel>Password</FormLabel>
              <Field name="password" component={InputPassword} />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              mt={7}
              py={3}
              h="fit-content"
              colorScheme="blue"
              isLoading={isLoading}
              isDisabled={
                Object.keys(errors).length > 0 ||
                values.email === '' ||
                values.password === ''
              }
            >
              Login
            </Button>

            <Text align="center">
              Dont have an account?{" "}
              <Link href="/auth/register" color="blue.500">
                Register
              </Link>
            </Text>

            <Divider />
            <GoogleLoginButton />
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
