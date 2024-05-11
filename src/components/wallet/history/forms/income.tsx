import { Field, Form, Formik } from "formik";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, Stack, Textarea, Flex, useColorModeValue, useToast } from "@chakra-ui/react";
import { IncomeSchema } from "@/schema/income";
import { useState } from "react";
import { addMyIncome } from "@/lib/api/incomes";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";

interface IncomesProps {
  amount: number | null;
  from: string;
  description: string;
  date: string;
};

export default function IncomeForm() {
  const toast = useToast();

  const uid = auth.currentUser?.uid;
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const formBg = useColorModeValue('white', 'gray.800');

  const handleSubmit = async (values: IncomesProps) => {
    setLoading(true);

    const createdAt = new Date().toISOString();
    const updatedAt = new Date().toISOString();

    const payload = { ...values, createdAt, updatedAt };

    try {
      const response = await addMyIncome(uid!, payload);
      if (response.status === 201) {
        router.replace('/wallet');
        return toast({
          title: "Success",
          description: "Income has been added",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right"
        });
      }
    } catch (error) {
      console.error("Failed to add income:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ amount: null, from: '', description: '', date: '' }}
      validationSchema={IncomeSchema}
      onSubmit={(values: IncomesProps) => {
        handleSubmit(values);
      }}
    >
      {({ values, errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Stack spacing={5} bg={formBg} p={6} rounded={'lg'}>
            <FormControl isRequired isInvalid={!!errors.amount && touched.amount}>
              <FormLabel>Amount</FormLabel>
              <InputGroup>
                <InputLeftElement>Rp</InputLeftElement>
                <Input as={Field} type="number" name="amount" placeholder="0" />
              </InputGroup>
              <FormErrorMessage>{errors.amount}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.from && touched.from}>
              <FormLabel>Source</FormLabel>
              <Input as={Field} name="from" />
              <FormErrorMessage>{errors.from}</FormErrorMessage>
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
                  values.from === '' ||
                  values.date === ''
                }
              >
                Submit
              </Button>
              <Button variant={'outline'} colorScheme="red" type="reset">
                Cancel
              </Button>
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
