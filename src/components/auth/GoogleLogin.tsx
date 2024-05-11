import { getFirebaseAuthErrorMessage } from "@/lib/firebase/dto";
import { auth } from "@/lib/firebase";
import { Button, Icon, useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton() {
  const toast = useToast();
  const router = useRouter();

  const handleLoginGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);

      router.replace("/");

      return toast({
        title: "Success",
        description: `Welcome, ${response?.user?.displayName}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: 'top-right'
      })
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
    }
  }

  return (
    <Button
      variant={'outline'}
      h={'fit-content'}
      py={3}
      gap={4}
      justifyContent={'start'}
      onClick={handleLoginGoogle}
    >
      <Icon as={FcGoogle} w={6} h={6} />
      Continue With Google
    </Button>
  )
}