import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const ImageUpload = () => {
  return (
    <FormControl>
      <FormLabel>Upload Image</FormLabel>
      <Input type="file" padding={1} />
    </FormControl>
  );
};

export default ImageUpload;
