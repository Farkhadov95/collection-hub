import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <Stack
      margin={"auto"}
      marginTop={"10vh"}
      display={"flex"}
      height={"auto"}
      width={{ base: "90vw", sm: "50vw", md: "50vw", lg: "40vw", xl: "30vw" }}
      boxSizing={"border-box"}
      border={"1px solid"}
      padding={5}
      borderRadius={10}
      bgColor={""}
    >
      <Heading as={"h2"} marginBottom={5}>
        Login
      </Heading>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input border={"1px solid"} placeholder="First name" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input border={"1px solid"} placeholder="Password" />
      </FormControl>
      <HStack justifyContent={"space-between"} marginTop={5}>
        <Button as={NavLink} to={"/signup"} variant={"outline"}>
          Sign Up
        </Button>
        <Button as={NavLink} to={"/"} variant={"outline"} colorScheme="green">
          Sign In
        </Button>
      </HStack>
    </Stack>
  );
};

export default Login;
