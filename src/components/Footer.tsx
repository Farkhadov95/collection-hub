import { Button, HStack, Icon, Tooltip } from "@chakra-ui/react";

import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCollectionStore } from "../store/store";

const Footer = () => {
  const currentUser = useCollectionStore((state) => state.currentUser);

  return (
    <HStack padding={5} justifyContent={"space-between"}>
      {currentUser._id !== "" && (
        <Tooltip label="promotes to admin for testing">
          <Button variant={"ghost"} colorScheme="green" size={"small"}>
            Promote
          </Button>
        </Tooltip>
      )}
      <Link to={"https://github.com/Farkhadov95/collection-hub"}>
        <Icon as={FaGithub} />
      </Link>
    </HStack>
  );
};

export default Footer;
