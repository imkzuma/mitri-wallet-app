import { Box, Text } from "@chakra-ui/react";

export default function ProfileHeader() {
  return (
    <Box
      textAlign={'center'}
      bg={'blue.500'}
      p={5} pb={8}
      roundedTop={'lg'}
    >
      <Text fontWeight={'bold'} color={'white'}>
        Profile
      </Text>
    </Box>
  )
}