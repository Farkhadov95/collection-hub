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
import { FieldType } from "../../../types/types";
import { IoMdClose } from "react-icons/io";

type FeatureDeleteProps = {
  feature: FieldType;
  handleDelete: (id: string) => Promise<void>;
};

const FeatureDelete = ({ feature, handleDelete }: FeatureDeleteProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

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
            Delete field "{feature.fieldName}"?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            This will delete the field from all items in the collection.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button variant={"outline"} ref={cancelRef} onClick={onClose}>
              No
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
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FeatureDelete;
