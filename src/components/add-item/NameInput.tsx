import { FormControl, HStack, FormLabel, Input, Text } from "@chakra-ui/react";
import hookForm from "../../hookForm";
import { useTranslation } from "react-i18next";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ReqItemData } from "../../types/item";

type Props = {
  register: UseFormRegister<ReqItemData>;
  errors: FieldErrors<ReqItemData>;
};

const NameInput = ({ register, errors }: Props) => {
  const { t } = useTranslation();

  return (
    <FormControl isRequired>
      <HStack justify={"space-between"}>
        <FormLabel>{t("nav.name")}</FormLabel>
        <Text fontSize={"small"} paddingX={1} color={"red.300"}>
          {errors.name?.message}
        </Text>
      </HStack>
      <Input
        {...register("name", {
          required: hookForm.required,
        })}
        type={"text"}
        placeholder="Name"
        borderColor={errors.name ? "red.300" : "gray.300"}
      />
    </FormControl>
  );
};

export default NameInput;
