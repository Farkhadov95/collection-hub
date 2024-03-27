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
import { NavLink, useNavigate } from "react-router-dom";
import { currentUser, user } from "../types/types";
import { loginUser } from "../services/user";
import { useCollectionStore, useNonPersistStore } from "../store/store";
import useErrorHandler from "../hooks/useError";
import { useTranslation } from "react-i18next";

const Login = () => {
  const form = useForm<user>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { handleUserFail } = useErrorHandler();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userError = useNonPersistStore((state) => state.userError);
  const setCurrentUser = useCollectionStore((state) => state.setCurrentUser);

  const handleSuccess = (data: currentUser) => {
    setCurrentUser(data);
    navigate("/");
  };

  const onSubmit = (data: user) => {
    console.log("Form Submitted", data);
    loginUser(data, handleSuccess, handleUserFail);
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
          <Heading as={"h2"}>{t("nav.logInTitle")}</Heading>
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
          <FormLabel>{t("nav.password")}</FormLabel>
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
            {t("nav.orSignUp")}
          </Button>
          <Button type="submit" variant={"outline"} colorScheme="green">
            {t("nav.logIn")}
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default Login;
