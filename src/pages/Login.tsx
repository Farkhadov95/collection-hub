import { Button, HStack, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { currentUser, user } from "../types/user";
import { loginUser } from "../services/user";
import { useNonPersistStore } from "../store/utilStore";
import { useUserStore } from "../store/userStore";
import useErrorHandler from "../hooks/useError";
import { useTranslation } from "react-i18next";
import LoginTitle from "../components/login/PageTitle";
import EmailInput from "../components/login/EmailInput";
import PasswordInput from "../components/login/PasswordInput";

const Login = () => {
  const form = useForm<user>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { handleUserFail } = useErrorHandler();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const userError = useNonPersistStore((state) => state.userError);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const handleSuccess = (userData: currentUser, token: string) => {
    setCurrentUser(userData);
    localStorage.setItem("X-Auth-Token", token);
    navigate("/");
  };

  const onSubmit = (data: user) => {
    loginUser(data)
      .then((data) => {
        handleSuccess(
          {
            _id: data._id,
            username: data.username,
            email: data.email,
            isAdmin: data.isAdmin,
          },
          data.token
        );
      })
      .catch((err) => {
        handleUserFail(err.message);
      });
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
        <LoginTitle userError={userError} />
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
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
