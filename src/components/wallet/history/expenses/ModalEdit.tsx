import { updateMyExpense } from "@/lib/api/expense";
import { useFirebaseAuth } from "@/lib/firebase/auth";
import { useAppDispatch } from "@/lib/redux/hooks";
import { editExpense, type ExpensesProps } from "@/lib/redux/state/expenses";
import { ExpenseSchema } from "@/schema/expense";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useToast } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRef, useState } from "react";

interface ModalEditExpenseProps {
  isOpen: boolean;
  onClose: () => void;
  expense: ExpensesProps;
}

export default function ModalEditExpense({ isOpen, onClose, expense }: ModalEditExpenseProps) {
  const toast = useToast();

  const dispatch = useAppDispatch();
  const { user } = useFirebaseAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (btnRef.current) {
      btnRef.current.click();
    }
  }

  const handleSubmit = async (values: Omit<ExpensesProps, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    setLoading(true);
    try {
      const updatedAt = new Date().toISOString();

      const data = {
        amount: values.amount,
        description: values.description,
        to: values.to,
        date: values.date,
        createdAt: expense.createdAt,
        updatedAt: updatedAt
      };

      const response = await updateMyExpense(expense.id, user?.uid!, data);
      dispatch(editExpense(response));
      return toast({
        title: "Success",
        description: "Expense updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
    } catch (error) {
      return toast({
        title: "Error",
        description: "Failed to update expense",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={{ base: 'full', md: 'md' }}
    >
      <ModalOverlay
        style={{
          backdropFilter: 'blur(4px)',
          transition: 'backdrop-filter 0.3s ease'
        }}
      >
        <ModalContent>
          <ModalHeader>Edit Expense</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                amount: expense.amount,
                description: expense.description,
                to: expense.to,
                date: expense.date
              }}
              validationSchema={ExpenseSchema}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                  <Stack spacing={5} rounded={'lg'}>
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
                  </Stack>
                  <Button ref={btnRef} type="submit" hidden display={'none'} />
                </Form>
              )}
            </Formik>
          </ModalBody>
          <ModalFooter gap={3} flexDir={{ base: 'column', md: 'row' }} pb={{ base: 8, md: 5 }}>
            <Button
              w={{ base: 'full', md: 'fit-content' }}
              size={{ base: 'md', md: 'sm' }}
              isDisabled={loading}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              w={{ base: 'full', md: 'fit-content' }}
              size={{ base: 'md', md: 'sm' }}
              colorScheme="blue"
              onClick={handleClick}
              isLoading={loading}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}