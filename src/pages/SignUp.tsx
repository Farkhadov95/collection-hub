import {
  HStack,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
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
        Sign Up
      </Heading>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input type={"text"} border={"1px solid"} placeholder="First name" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type={"email"} border={"1px solid"} placeholder="Email" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input type={"password"} border={"1px solid"} placeholder="Password" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type={"password"}
          border={"1px solid"}
          placeholder="Confirm Password"
        />
      </FormControl>
      <HStack justifyContent={"space-between"} marginTop={5}>
        <Button as={NavLink} to={"/login"} variant={"outline"}>
          or Sign In
        </Button>
        <Button as={NavLink} to={"/"} variant={"outline"} colorScheme="green">
          Sign Up
        </Button>
      </HStack>
    </Stack>
  );
};

export default SignUp;
