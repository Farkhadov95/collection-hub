import { Divider } from "@chakra-ui/react";
import Collections from "../components/collections/Collections";
import Navbar from "../components/Navbar";

const User = () => {
  return (
    <>
      <Navbar />
      <Divider />
      <Collections />
    </>
  );
};

export default User;
