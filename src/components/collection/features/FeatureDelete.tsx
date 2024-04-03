import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  IconButton,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FieldType } from "../../../types/collections";
import { IoMdClose } from "react-icons/io";
import { useTranslation } from "react-i18next";

type FeatureDeleteProps = {
  feature: FieldType;
  handleDelete: (id: string) => Promise<void>;
};

const FeatureDelete = ({ feature, handleDelete }: FeatureDeleteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { t } = useTranslation();

  return (
    <>
      <IconButton
        onClick={onOpen}
        size={"xs"}
        variant={"ghost"}
        aria-label="delete"
        icon={<IoMdClose />}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            {t("item.deleteField")} "{feature.fieldName}"?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{t("item.deleteFieldMsg")}</AlertDialogBody>
          <AlertDialogFooter>
            <Button variant={"outline"} ref={cancelRef} onClick={onClose}>
              {t("tools.no")}
            </Button>
            <Button
              variant={"outline"}
              colorScheme="red"
              ml={3}
              onClick={() => {
                handleDelete(feature._id || "");
                onClose();
              }}
            >
              {t("tools.yes")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FeatureDelete;
