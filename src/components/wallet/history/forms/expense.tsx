import { Field, Form, Formik } from "formik";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, Stack, Textarea, Flex, useColorModeValue, useToast } from "@chakra-ui/react";
import { ExpenseSchema } from "@/schema/expense";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { addMyExpense } from "@/lib/api/expense";

interface ExpenseProps {
  amount: number | null;
  to: string;
  description: string;
  date: string;
};

export default function ExpenseForm() {
  const toast = useToast();

  const uid = auth.currentUser?.uid;
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const formBg = useColorModeValue('white', 'gray.700');

  const handleSubmit = async (values: ExpenseProps) => {
    setLoading(true);

    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const payload = { ...values, createdAt, updatedAt };

    try {
      const response = await addMyExpense(uid!, payload);
      if (response.status === 201) {
        router.replace('/wallet');
        return toast({
          title: "Success",
          description: "Expense has been added",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        });
      }
    } catch (error) {
      console.error("Failed to add expense:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ amount: null, to: '', description: '', date: '' }}
      validationSchema={ExpenseSchema}
      onSubmit={(values: ExpenseProps) => {
        handleSubmit(values);
      }}
    >
      {({ values, errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Stack spacing={5} bg={formBg} p={6} rounded={'lg'}>
            <FormControl isRequired isInvalid={!!errors.amount && touched.amount}>
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <InputLeftElement>Rp</InputLeftElement>
                <Input as={Field} type="number" name="amount" placeholder="0" />
              </InputGroup>
              <FormErrorMessage>{errors.amount}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.to && touched.to}>
              <FormLabel>Expense Source</FormLabel>
              <Input as={Field} name="to" />
              <FormErrorMessage>{errors.to}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea as={Field} name="description" />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.date && touched.date}>
              <FormLabel>Date</FormLabel>
              <Input as={Field} type="date" name="date" />
              <FormErrorMessage>{errors.date}</FormErrorMessage>
            </FormControl>

            <Flex gap={3} justify={'end'} flexDir={{ base: 'column', md: 'row' }} pt={5}>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={loading}
                isDisabled={
                  Object.keys(errors).length > 0 ||
                  values.amount === 0 ||
                  values.to === '' ||
                  values.date === ''
                }
              >
                Submit
              </Button>
              <Button variant={'outline'} colorScheme="red" type="reset" isDisabled={loading}>
                Cancel
              </Button>
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
