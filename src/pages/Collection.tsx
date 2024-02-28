import { Divider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import CollectionContent from "../components/CollectionContent";
import CollectionAbout from "../components/CollectionAbout";

const Collection = () => {
  return (
    <>
      <Navbar />
      <Divider marginY={5} />
      <CollectionAbout />
      <Divider marginY={5} />
      <CollectionContent />
    </>
  );
};

export default Collection;
