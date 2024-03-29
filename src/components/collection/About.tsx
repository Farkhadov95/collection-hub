import { Heading, Image, Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Collection } from "../../types/types";
import placeholderImage from "../../assets/placeholder.jpg";
import Markdown from "react-markdown";
import { useCollectionStore } from "../../store/store";
import EditCollectionCard from "../collection-card/EditCollectionCard";
import { useTranslation } from "react-i18next";

type AboutProp = {
  currentCollection: Collection;
};

const About = ({ currentCollection }: AboutProp) => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  const { t } = useTranslation();
  const isAuth =
    currentUser._id === currentCollection?.userID || currentUser.isAdmin;
  return (
    <Flex
      mt={{ base: 3, md: 0 }}
      height={"fit-content"}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent={{ base: "center", md: "space-between" }}
      alignItems={{ base: "center", md: "normal" }}
    >
      <Flex
        flexDirection={"column"}
        justifyContent={"space-between"}
        width={"100%"}
        boxSizing={"border-box"}
        paddingRight={{ md: 10 }}
      >
        <Box>
          <HStack justifyContent={"space-between"}>
            <Heading size={"lg"}>{currentCollection.name}</Heading>
            {isAuth && (
              <EditCollectionCard
                collection={currentCollection}
                isCard={false}
              />
            )}
          </HStack>
          <Text fontWeight={"bold"} fontSize={"small"} noOfLines={1}>
            {t("collection.createdBy")} {currentCollection.userName}
          </Text>
        </Box>
        <Box
          width={"100%"}
          textAlign={"justify"}
          marginTop={{ base: 2, md: "none" }}
          marginBottom={{ base: 5, md: "none" }}
        >
          <Markdown>{currentCollection.description}</Markdown>
        </Box>
      </Flex>
      <Box width={"300px"}>
        <Image
          height={"300px"}
          width={"100%"}
          alt={currentCollection.name}
          objectFit="cover"
          objectPosition={currentCollection.image ? "0 0" : "center"}
          src={
            currentCollection.image !== ""
              ? currentCollection.image
              : placeholderImage
          }
        />
      </Box>
    </Flex>
  );
};

export default About;
