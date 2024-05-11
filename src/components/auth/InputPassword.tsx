import { Button, Icon, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"

interface FieldProps {
  field: any;
  form: any;
};

export const InputPassword = ({ field, form, ...props }: FieldProps) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <InputGroup>
      <Input
        {...field}
        {...props}
        id="password"
        type={show ? "text" : "password"}
        placeholder="input your password"
      />
      <InputRightElement>
        <Button size="sm" onClick={() => setShow(!show)} h={8} w={4}>
          {show ? <Icon as={FiEyeOff} /> : <Icon as={FiEye} />}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}
