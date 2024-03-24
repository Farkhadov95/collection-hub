import {
  HStack,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
  Text,
  FormControl,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { NavLink, useNavigate } from "react-router-dom";
import { currentUser, newUserForm } from "../types/types";
import { registerUser } from "../services/user";
import { useCollectionStore, useNonPersistStore } from "../store/store";
import useErrorHandler from "../hooks/useError";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const form = useForm<newUserForm>();
  const { register, handleSubmit, control, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const { handleUserFail } = useErrorHandler();
  const { t } = useTranslation();

  const userError = useNonPersistStore((state) => state.userError);
  const setCurrentUser = useCollectionStore((state) => state.setCurrentUser);

  const handleSuccess = (data: currentUser) => {
    console.log(data);
    setCurrentUser(data);
    navigate("/");
  };

  const onSubmit = (data: newUserForm) => {
    console.log("Form Submitted", data);
    const adjustedData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    registerUser(adjustedData, handleSuccess, handleUserFail);
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
          <Heading as={"h2"}>{t("nav.signUpTitle")}</Heading>
          <Text
            paddingX={1}
            color={"red.300"}
            mt={2}
            display={userError !== "" ? "block" : "none"}
          >
            {userError}
          </Text>
        </Box>
        <FormControl isRequired>
          <FormLabel htmlFor="username">{t("nav.name")}</FormLabel>
          <Input
            id="username"
            type={"text"}
            border={"1px solid"}
            borderColor={errors.username ? "red.300" : "gray.300"}
            placeholder="Name"
            {...register("username", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
          <Text fontSize={"small"} paddingX={1} color={"red.300"}>
            {errors.username?.message}
          </Text>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type={"email"}
            border={"1px solid"}
            borderColor={errors.email ? "red.300" : "gray.300"}
            placeholder="Email"
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
          <FormLabel htmlFor="password">{t("nav.password")}</FormLabel>
          <Input
            id="password"
            type={"password"}
            border={"1px solid"}
            borderColor={errors.password ? "red.300" : "gray.300"}
            placeholder="Password"
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
        <FormControl isRequired>
          <FormLabel htmlFor="conf_password">
            {t("nav.confirmPassword")}
          </FormLabel>
          <Input
            id="conf_password"
            type={"password"}
            border={"1px solid"}
            borderColor={errors.conf_password ? "red.300" : "gray.300"}
            placeholder="Confirm Password"
            {...register("conf_password", {
              required: {
                value: true,
                message: "Password confirmation is required",
              },
              validate: (value) => {
                return (
                  value === form.getValues("password") ||
                  "Passwords should be identical"
                );
              },
            })}
          />
          <Text fontSize={"small"} paddingX={1} color={"red.300"}>
            {errors.conf_password?.message}
          </Text>
        </FormControl>

        <HStack justifyContent={"space-between"} marginTop={5}>
          <Button as={NavLink} to={"/login"} variant={"outline"}>
            {t("nav.orLogIn")}
          </Button>
          <Button type="submit" variant={"outline"} colorScheme="green">
            {t("nav.signUp")}
          </Button>
        </HStack>
      </Box>
      <DevTool control={control} />
    </>
  );
};

export default SignUp;
