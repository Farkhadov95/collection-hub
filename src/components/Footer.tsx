import { Button, HStack, Icon, Spinner, Tooltip } from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/store";
import { promoteMe } from "../services/user";
import useErrorHandler from "../hooks/useError";
import { useState } from "react";

const Footer = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setCurrentUsers = useUserStore((state) => state.setCurrentUser);
  const [isLoading, setIsLoading] = useState(false);

  const { handleFail } = useErrorHandler();

  const handleStatusUpdate = () => {
    if (currentUser._id !== "") {
      setIsLoading(true);
      promoteMe(currentUser._id, true)
        .then((res) => {
          setCurrentUsers(res);
          setIsLoading(false);
        })
        .catch((err) => {
          const errorMessage = err.message.toString();
          handleFail(errorMessage);
          setIsLoading(false);
        });
    }
  };

  const isAuth = !currentUser.isAdmin && currentUser._id !== "";

  return (
    <HStack padding={5} justifyContent={"space-between"}>
      {isAuth &&
        (isLoading ? (
          <Spinner />
        ) : (
          <HStack>
            <Tooltip label="This is purely for demo, in case there will be no admin to make you admin">
              <span>
                <Icon as={BsInfoCircle} color={"green.200"} />
              </span>
            </Tooltip>
            <Button
              variant={"ghost"}
              colorScheme="green"
              size={"small"}
              fontSize={"sm"}
              onClick={handleStatusUpdate}
            >
              Promote me
            </Button>
          </HStack>
        ))}
      <Link to={"https://github.com/Farkhadov95/collection-hub"}>
        <Icon as={FaGithub} />
      </Link>
    </HStack>
  );
};

export default Footer;
