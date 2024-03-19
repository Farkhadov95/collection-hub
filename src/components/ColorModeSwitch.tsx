import { IconButton, useColorMode } from "@chakra-ui/react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const handleSwitch = () => {
    toggleColorMode();
  };
  return (
    <IconButton
      variant={"outline"}
      aria-label={"Color Mode Switch"}
      colorScheme="green"
      icon={
        colorMode === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />
      }
      onClick={handleSwitch}
    />
  );
};

export default ColorModeSwitch;
