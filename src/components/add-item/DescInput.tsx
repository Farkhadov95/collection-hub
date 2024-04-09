import {
  FormControl,
  HStack,
  FormLabel,
  Textarea,
  Text,
} from "@chakra-ui/react";
import hookForm from "../../hookForm";
import { useTranslation } from "react-i18next";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ReqItemData } from "../../types/item";

type Props = {
  register: UseFormRegister<ReqItemData>;
  errors: FieldErrors<ReqItemData>;
};

const DescInput = ({ register, errors }: Props) => {
  const { t } = useTranslation();
  return (
    <FormControl isRequired>
      <HStack justify={"space-between"}>
        <FormLabel htmlFor="desc">{t("collection.description")}</FormLabel>
        <Text fontSize={"small"} paddingX={1} color={"red.300"}>
          {errors.description?.message}
        </Text>
      </HStack>
      <Textarea
        {...register("description", {
          required: hookForm.required,
          maxLength: hookForm.maxLength500,
        })}
        id="desc"
        display={"block"}
        height={"120px"}
        width={"100%"}
        verticalAlign={"top"}
        borderColor={errors.description ? "red.300" : "gray.300"}
      />
    </FormControl>
  );
};

export default DescInput;
