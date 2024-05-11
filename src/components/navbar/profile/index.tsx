import { Menu, MenuButton, MenuList, Button, Flex } from "@chakra-ui/react";
import type { User } from "firebase/auth";
import ProfileHeader from "@/components/navbar/profile/header";
import ProfileInfo from "@/components/navbar/profile/info";
import ProfileActions from "@/components/navbar/profile/action";

export default function ProfileMenuNavbar({ user }: { user: User | null }) {
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="blue" size={'sm'}>
        Hi, {user?.displayName}
      </MenuButton>
      <MenuList p={0} rounded={'lg'}>
        <ProfileHeader />
        <Flex align={'center'} direction={'column'} gap={3} px={2}>
          <ProfileInfo user={user} />
          <ProfileActions />
        </Flex>
      </MenuList>
    </Menu>
  )
}