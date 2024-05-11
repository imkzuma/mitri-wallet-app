import { Button, Stack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { signOut } from "@/lib/firebase/auth";

export default function ProfileActions() {
  const router = useRouter();
  const toast = useToast();

  const handleLogout = () => {
    signOut();
    return toast({
      title: "Signed out",
      description: "You have been signed out",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right"
    });
  }

  return (
    <Stack w={'full'} my={2} spacing={2}>
      <Button size={'sm'} onClick={() => router.push('/profile')}>
        Profile Page
      </Button>
      <Button
        colorScheme="red"
        bg={'red.500'}
        size={'sm'}
        w={'full'}
        onClick={handleLogout}
      >
        Sign Out
      </Button>
    </Stack>
  )
}
