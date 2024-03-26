import { HStack, Icon } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <HStack padding={5} justifyContent={"end"}>
      <Link to={"https://github.com/Farkhadov95/collection-hub"}>
        <Icon as={FaGithub} />
      </Link>
    </HStack>
  );
};

export default Footer;
