import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import hookForm from "../../hookForm";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { user } from "../../types/user";

type Props = {
  register: UseFormRegister<user>;
  errors: FieldErrors<user>;
};

const EmailInput = ({ register, errors }: Props) => {
  return (
    <FormControl isRequired>
      <FormLabel>Email</FormLabel>
      <Input
        border={"1px solid"}
        placeholder="Email"
        borderColor={errors.email ? "red.300" : "gray.300"}
        {...register("email", {
          required: hookForm.required,
          pattern: hookForm.emailPattern,
        })}
      />
      <Text fontSize={"small"} paddingX={1} color={"red.300"}>
        {errors.email?.message}
      </Text>
    </FormControl>
  );
};

export default EmailInput;
