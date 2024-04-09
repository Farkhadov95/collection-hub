import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { newUserForm } from "../../types/user";

type Props = {
  register: UseFormRegister<newUserForm>;
  errors: FieldErrors<newUserForm>;
};

const NameInput = ({ register, errors }: Props) => {
  const { t } = useTranslation();
  return (
    <FormControl isRequired>
      <FormLabel htmlFor="username">{t("nav.name")}</FormLabel>
      <Input
        id="username"
        type={"text"}
        border={"1px solid"}
        borderColor={errors.username ? "red.300" : "gray.300"}
        placeholder="Name"
        {...register("username", {
          required: {
            value: true,
            message: "Name is required",
          },
        })}
      />
      <Text fontSize={"small"} paddingX={1} color={"red.300"}>
        {errors.username?.message}
      </Text>
    </FormControl>
  );
};

export default NameInput;
