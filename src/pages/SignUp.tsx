import { HStack, Button, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { currentUser, newUserForm } from "../types/user";
import { registerUser } from "../services/user";
import { useNonPersistStore } from "../store/utilStore";
import { useUserStore } from "../store/userStore";
import useErrorHandler from "../hooks/useError";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/signup/PageTitle";
import NameInput from "../components/signup/NameInput";
import EmailInput from "../components/signup/EmailInput";
import PasswordInput from "../components/signup/PasswordInput";
import PasswordConfInput from "../components/signup/PasswordConfInput";

const SignUp = () => {
  const form = useForm<newUserForm>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const { handleUserFail } = useErrorHandler();
  const { t } = useTranslation();

  const userError = useNonPersistStore((state) => state.userError);
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const handleSuccess = (userData: currentUser, token: string) => {
    localStorage.setItem("X-Auth-Token", token);
    setCurrentUser(userData);
    navigate("/");
  };

  const onSubmit = (data: newUserForm) => {
    const adjustedData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    registerUser(adjustedData)
      .then((data) =>
        handleSuccess(
          {
            username: data.username,
            email: data.email,
            _id: data._id,
            isAdmin: data.isAdmin,
          },
          data.token
        )
      )
      .catch((err) => handleUserFail(err.message));
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
        <PageTitle userError={userError} />
        <NameInput register={register} errors={errors} />
        <EmailInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <PasswordConfInput
          register={register}
          errors={errors}
          passwordValue={form.getValues("password")}
        />
        <HStack justifyContent={"space-between"} marginTop={5}>
          <Button as={NavLink} to={"/login"} variant={"outline"}>
            {t("nav.orLogIn")}
          </Button>
          <Button type="submit" variant={"outline"} colorScheme="green">
            {t("nav.signUp")}
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default SignUp;
