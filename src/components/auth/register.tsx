import { RegisterSchema } from "@/schema/auth";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Link, Stack, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleLoginButton from "./GoogleLogin";
import { FirebaseError } from "firebase/app";
import { auth } from "@/lib/firebase";
import { InputPassword } from "./InputPassword";

interface RegisterProps {
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

export default function RegisterComponent() {
  const toast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ email, password }: RegisterProps) => {
    setIsLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      router.replace("/");
      return toast({
        title: "Success",
        description: `Selamat Datang, ${response?.user?.email}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right"
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorMessage = error.code === "auth/invalid-credential"
          ? "Email atau Password salah"
          : "Terjadi kesalahan saat masuk";

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
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={RegisterSchema}
      onSubmit={handleSubmit}
    >
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

            <FormControl isRequired isInvalid={!!errors.confirmPassword && touched.confirmPassword}>
              <FormLabel>Confirmation Password</FormLabel>
              <Field name="confirmPassword" component={InputPassword} />
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
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
                values.password === '' ||
                values.confirmPassword === ''
              }
            >
              Register
            </Button>

            <Text align="center">
              Already have an account?{" "}
              <Link href="/auth/login" color="blue.500">
                Login
              </Link>
            </Text>

            <Divider />
            <GoogleLoginButton />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
