import { IconButton } from "@chakra-ui/react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      aria-label="back"
      onClick={() => navigate(-1)}
      variant={"outline"}
      icon={<IoIosArrowBack />}
    />
  );
};

export default BackButton;
