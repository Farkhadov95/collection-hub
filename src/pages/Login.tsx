import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { user } from "../types/types";
import { DevTool } from "@hookform/devtools";

const Login = () => {
  const form = useForm<user>();
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: user) => {
    console.log("Form Submitted", data);
  };

  return (
    <>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        margin={"auto"}
        marginTop={"10vh"}
        display={"flex"}
        flexDirection={"column"}
        height={"auto"}
        width={{ base: "90vw", sm: "50vw", md: "50vw", lg: "40vw", xl: "30vw" }}
        boxSizing={"border-box"}
        border={"1px solid"}
        padding={5}
        borderRadius={10}
        gap={1}
      >
        <Box marginBottom={5}>
          <Heading as={"h2"}>Login</Heading>
          <Text paddingX={1} color={"red.300"} mt={2} display={"block"}>
            User is not registred
          </Text>
        </Box>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            border={"1px solid"}
            placeholder="Email"
            borderColor={errors.email ? "red.300" : "gray.300"}
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <Text fontSize={"small"} paddingX={1} color={"red.300"}>
            {errors.email?.message}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            border={"1px solid"}
            placeholder="Password"
            borderColor={errors.password ? "red.300" : "gray.300"}
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          <Text fontSize={"small"} paddingX={1} color={"red.300"}>
            {errors.password?.message}
          </Text>
        </FormControl>
        <HStack justifyContent={"space-between"} marginTop={5}>
          <Button as={NavLink} to={"/signup"} variant={"outline"}>
            or Sign Up
          </Button>
          <Button type="submit" variant={"outline"} colorScheme="green">
            Sign In
          </Button>
        </HStack>
      </Box>
      <DevTool control={control} />
    </>
  );
};

export default Login;
