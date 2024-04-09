import {
  FormControl,
  Checkbox,
  FormLabel,
  Badge,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { OptItemData } from "../../types/item";

type Props = {
  optFormData: OptItemData;
  setOptFormData: Dispatch<SetStateAction<OptItemData>>;
};

const OptionalInputs = ({ optFormData, setOptFormData }: Props) => {
  const { t } = useTranslation();

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, id, type } = event.target;

    setOptFormData((prevState) => {
      const existingFieldIndex = prevState.fields.findIndex(
        (field) => field._id === id
      );

      if (existingFieldIndex !== -1) {
        const updatedFields = [...prevState.fields];
        updatedFields[existingFieldIndex].fieldValue = value;
        return {
          ...prevState,
          fields: updatedFields,
        };
      } else {
        return {
          ...prevState,
          fields: [
            ...prevState.fields,
            { fieldName: name, fieldType: type, fieldValue: value, _id: id },
          ],
        };
      }
    });
  };

  return (
    <>
      {optFormData.fields.map((field) => (
        <FormControl key={field._id}>
          {field.fieldType === "checkbox" ? (
            <Checkbox
              id={field._id}
              name={field.fieldName}
              padding={2}
              width={"100%"}
            >
              {field.fieldName}
            </Checkbox>
          ) : (
            <>
              <FormLabel alignItems={"center"}>
                <Badge colorScheme="green" fontSize={"2xs"} mr={1}>
                  {t(`types.${field.fieldType}`)}
                </Badge>
                {field.fieldName}
              </FormLabel>
              <Input
                id={field._id}
                name={field.fieldName}
                type={field.fieldType}
                placeholder={field.fieldName}
                value={field.fieldValue}
                onChange={handleInputChange}
              />
            </>
          )}
        </FormControl>
      ))}
    </>
  );
};

export default OptionalInputs;
