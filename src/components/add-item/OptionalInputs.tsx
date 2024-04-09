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
import { useCollectionStore } from "../../store/collectionStore";
import { useParams } from "react-router-dom";

type Props = {
  setOptFormData: Dispatch<SetStateAction<OptItemData>>;
};

const OptionalInputs = ({ setOptFormData }: Props) => {
  const collectionID = useParams().id || "";
  const collections = useCollectionStore((state) => state.collections);
  const currentCollection = collections.find((c) => c._id === collectionID);
  const { t } = useTranslation();

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, id, type } = event.target;

    if (name !== "image") {
      setOptFormData((prevState) => {
        const existingFieldIndex = prevState.fields.findIndex(
          (field) => field.fieldName === name
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
    }
  };

  return (
    <>
      {currentCollection?.itemFields.map((item) => (
        <FormControl key={item._id}>
          {item.fieldType === "checkbox" ? (
            <Checkbox
              id={item._id}
              padding={2}
              width={"100%"}
              name={item.fieldName}
            >
              {item.fieldName}
            </Checkbox>
          ) : (
            <>
              <FormLabel alignItems={"center"}>
                <Badge colorScheme="green" fontSize={"2xs"} mr={1}>
                  {t(`types.${item.fieldType}`)}
                </Badge>
                {item.fieldName}
              </FormLabel>
              <Input
                id={item._id}
                name={item.fieldName}
                type={item.fieldType}
                placeholder={item.fieldName}
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
