import { IconButton } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type EditButtonProp = {
  itemID: string;
};

const EditButton = ({ itemID }: EditButtonProp) => {
  const navigate = useNavigate();
  return (
    <IconButton
      aria-label="Edit"
      variant={"ghost"}
      colorScheme="white"
      icon={<FaEdit />}
      onClick={() => navigate(`/item/edit/${itemID}`)}
    />
  );
};

export default EditButton;
