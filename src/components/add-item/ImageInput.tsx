import { FormControl, FormLabel, Badge, Input } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import useErrorHandler from "../../hooks/useError";
import { convertToBase64 } from "../../utils";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  setPostImage: Dispatch<
    SetStateAction<{
      myFile: string;
    }>
  >;
};

const ImageInput = ({ setPostImage }: Props) => {
  const { t } = useTranslation();
  const { handleFail } = useErrorHandler();

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileSize = file.size;
      const maxSize = 500000; // 500kb
      if (fileSize > maxSize) {
        handleFail("File size should NOT exceed 500kb");
        return;
      }
      const base64 = await convertToBase64(file);
      setPostImage({ myFile: base64 as string });
    }
  };

  return (
    <FormControl
      display={"flex"}
      border={"1px solid"}
      padding={2}
      borderRadius={10}
      alignItems={"center"}
    >
      <FormLabel
        display={"flex"}
        height={"fit-content"}
        fontWeight={"bold"}
        alignItems={"center"}
        marginBottom={0}
      >
        <Badge
          colorScheme="green"
          fontSize={"2xs"}
          marginRight={1}
          height={"fit-content"}
        >
          {t("types.file")}
        </Badge>
        {t("item.image")}
      </FormLabel>

      <Input
        name="myFile"
        type="file"
        id="imageUrl"
        border={"none"}
        paddingX={0}
        accept=".jpeg, .png, .jpg, .webp"
        onChange={(e) => {
          handleFileUpload(e);
        }}
        height={"fit-content"}
      />
    </FormControl>
  );
};

export default ImageInput;
