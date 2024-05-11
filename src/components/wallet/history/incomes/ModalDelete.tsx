import { deleteMyIncome } from "@/lib/api/incomes";
import { auth } from "@/lib/firebase";
import { useAppDispatch } from "@/lib/redux/hooks";
import { deleteIncome } from "@/lib/redux/state/incomes";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function ModalDeleteIncome({ isOpen, onClose, id }: { isOpen: boolean, onClose: () => void, id: number }) {
  const dispatch = useAppDispatch();

  const toast = useToast();
  const uid = auth.currentUser?.uid;

  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMyIncome(id, uid!);
      dispatch(deleteIncome(id));

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        style={{
          backdropFilter: 'blur(4px)',
          transition: 'backdrop-filter 0.3s ease'
        }}
      >
        <ModalContent>
          <ModalHeader>
            Delete Income
          </ModalHeader>
          <ModalBody>
            Are you sure you want to delete this income?
          </ModalBody>
          <ModalFooter gap={3}>
            <Button size={'sm'} onClick={onClose} isLoading={loading}>Cancel</Button>
            <Button size={'sm'} colorScheme="red" onClick={handleDelete} isLoading={loading}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}