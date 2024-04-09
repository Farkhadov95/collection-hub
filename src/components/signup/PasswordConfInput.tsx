import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import hookForm from "../../hookForm";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { newUserForm } from "../../types/user";
import { useTranslation } from "react-i18next";

type Props = {
  register: UseFormRegister<newUserForm>;
  errors: FieldErrors<newUserForm>;
  passwordValue: string;
};

const PasswordConfInput = ({ register, errors, passwordValue }: Props) => {
  const { t } = useTranslation();
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="conf_password">{t("nav.confirmPassword")}</FormLabel>
      <Input
        id="conf_password"
        type={"password"}
        border={"1px solid"}
        borderColor={errors.conf_password ? "red.300" : "gray.300"}
        placeholder="Confirm Password"
        {...register("conf_password", {
          required: hookForm.required,
          validate: (value) => {
            return value === passwordValue || "Passwords should be identical";
          },
        })}
      />
      <Text fontSize={"small"} paddingX={1} color={"red.300"}>
        {errors.conf_password?.message}
      </Text>
    </FormControl>
  );
};

export default PasswordConfInput;
