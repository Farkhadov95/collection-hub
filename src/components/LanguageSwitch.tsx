import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
  const [isEnglish, setIsEnglish] = useState(true);
  const { i18n } = useTranslation();

  const handleLanguageSwitch = () => {
    i18n.changeLanguage(isEnglish ? "en" : "ru");
    setIsEnglish(!isEnglish);
  };

  return (
    <Button
      variant={"outline"}
      aria-label={"Language Switch"}
      colorScheme="green"
      onClick={handleLanguageSwitch}
      fontSize={"small"}
      fontWeight={"bold"}
    >
      {isEnglish ? "EN" : "RU"}
    </Button>
  );
};

export default LanguageSwitch;
