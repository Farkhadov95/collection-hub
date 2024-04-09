import { Collection } from "../../types/collections";
import { FieldRenderType, ItemType } from "../../types/item";

const getInputValue = (currentItem: ItemType, collectionFieldID: string) => {
    const item = currentItem?.fields.find(
      (field) => field._id === collectionFieldID
    );
    return item?.fieldValue || "";
  };

export const updateInitialFieldsValue = (currentItem: ItemType, currentCollection: Collection) => {
    const fields: FieldRenderType[] = [];
    if (currentCollection) {
      currentCollection?.itemFields.map((field) => {
        if (field._id) {
          fields.push({
            _id: field._id,
            fieldName: field.fieldName,
            fieldType: field.fieldType,
            fieldValue: getInputValue(currentItem, field._id),
          });
        }
      });
    }
    return fields;
  };