import { deleteMyExpense } from "@/lib/api/expense";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/redux/hooks";
import { deleteExpense } from "@/lib/redux/state/expenses";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function ModalDeleteExpense({ isOpen, onClose, id }: { isOpen: boolean, onClose: () => void, id: number }) {
  const dispatch = useAppDispatch();

  const toast = useToast();
  const uid = auth.currentUser?.uid;

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMyExpense(id, uid!);
      dispatch(deleteExpense(id));

      return toast({
        title: "Success",
        description: "Income has been deleted",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top-right"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete income",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right"
      });
    } finally {
      setLoading(false);
      onClose();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'xs', md: 'md' }}>
      <ModalOverlay
        style={{
          backdropFilter: 'blur(4px)',
          transition: 'backdrop-filter 0.3s ease'
        }}
      >
        <ModalContent>
          <ModalHeader>
            Delete Expense
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete this expense?
          </ModalBody>
          <ModalFooter gap={2} flexDir={{ base: 'column-reverse', md: 'row' }} pb={{ base: 8, md: 5 }}>
            <Button
              size={'sm'}
              w={{ base: 'full', md: 'fit-content' }}
              colorScheme="red"
              onClick={handleDelete}
              isLoading={loading}
            >
              Delete
            </Button>
            <Button
              size={'sm'}
              w={{ base: 'full', md: 'fit-content' }}
              onClick={onClose}
              isDisabled={loading}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal >
  )
}