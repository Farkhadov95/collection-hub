import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import hookForm from "../../hookForm";
import { useTranslation } from "react-i18next";
import { newUserForm } from "../../types/user";

type Props = {
  register: UseFormRegister<newUserForm>;
  errors: FieldErrors<newUserForm>;
};

const PasswordInput = ({ register, errors }: Props) => {
  const { t } = useTranslation();
  return (
    <FormControl isRequired>
      <FormLabel>{t("nav.password")}</FormLabel>
      <Input
        border={"1px solid"}
        placeholder="Password"
        borderColor={errors.password ? "red.300" : "gray.300"}
        {...register("password", {
          required: hookForm.required,
        })}
      />
      <Text fontSize={"small"} paddingX={1} color={"red.300"}>
        {errors.password?.message}
      </Text>
    </FormControl>
  );
};

export default PasswordInput;
