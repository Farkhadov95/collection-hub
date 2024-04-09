import { FormControl, HStack, FormLabel, Input, Text } from "@chakra-ui/react";
import hookForm from "../../hookForm";
import { useTranslation } from "react-i18next";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ReqItemData } from "../../types/item";

type Props = {
  register: UseFormRegister<ReqItemData>;
  errors: FieldErrors<ReqItemData>;
};

const TagInput = ({ register, errors }: Props) => {
  const { t } = useTranslation();
  return (
    <FormControl isRequired>
      <HStack justify={"space-between"}>
        <FormLabel htmlFor="tags">{t("item.tags")}</FormLabel>
        <Text fontSize={"small"} paddingX={1} color={"red.300"}>
          {errors.tags?.message}
        </Text>
      </HStack>
      <Input
        {...register("tags", {
          required: hookForm.required,
          pattern: hookForm.tagPattern,
        })}
        type={"text"}
        id="tags"
        placeholder="One Two Three"
        borderColor={errors.tags ? "red.300" : "gray.300"}
      />
    </FormControl>
  );
};

export default TagInput;
