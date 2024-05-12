import { Avatar, Badge, Divider, Skeleton, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import type { User } from "firebase/auth";

interface UserInfoProps {
  currentUser: User | null;
  type: "income" | "expense";
  isLoading: boolean;
}

export default function HistoryUserInfo({ currentUser, type, isLoading }: UserInfoProps) {
  return (
    <Stack
      align="center"
      bg={useColorModeValue("white", "gray.700")}
      p={5}
      rounded="lg"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.800")}
    >
      {isLoading
        ? <Skeleton height={20} width={20} rounded="lg" />
        : (
          <>
            <Avatar size="xl" name={currentUser?.displayName || "Unknown"} src={currentUser?.photoURL || undefined} mb={3} />
            <Stack spacing={0} align="center">
              <Text fontSize="lg">{currentUser?.displayName}</Text>
              <Text fontSize="sm">{currentUser?.email}</Text>
            </Stack>
            <Divider my={3} />
            <Badge colorScheme={type === 'income' ? 'green' : 'red'} rounded="full" px={3}>
              {type === "income" ? "Income" : "Expense"}
            </Badge>

          </>
        )
      }
    </Stack>
  )
}