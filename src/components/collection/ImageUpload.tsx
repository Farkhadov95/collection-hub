import { Badge, FormControl, FormLabel, Input } from "@chakra-ui/react";

const ImageUpload = () => {
  return (
    <FormControl>
      <FormLabel>
        <Badge colorScheme="green" fontSize={"2xs"} mr={1}>
          link
        </Badge>
        Image URL
      </FormLabel>

      <Input type={"url"} placeholder="http://www.example.com/" />
    </FormControl>
  );
};

export default ImageUpload;
