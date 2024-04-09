import { Box, Button, Heading, Textarea, VStack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { postComment } from "../../services/comment";
import { useParams } from "react-router-dom";
import useErrorHandler from "../../hooks/useError";
import { useCommentStore } from "../../store/commentStore";
import { useUserStore } from "../../store/userStore";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { newComment } from "../../types/comment";
import { useTranslation } from "react-i18next";
import ItemComment from "./ItemComment";

const URL = "https://collection-hub-server.adaptable.app/";

const ItemComments = () => {
  const itemID = useParams().id || "";
  const comments = useCommentStore((state) => state.comments);
  const setComments = useCommentStore((state) => state.setComments);
  const currentUser = useUserStore((state) => state.currentUser);

  const form = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { handleFail } = useErrorHandler();
  const { t } = useTranslation();
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  const onSubmit = (formData: newComment) => {
    postComment(itemID, formData)
      .then(() => {
        form.reset();
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  };

  useEffect(() => {
    if (commentsContainerRef.current) {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    }
  }, [comments]);

  useEffect(() => {
    const socket = io(URL);
    socket.on("newComment", (data) => {
      setComments([...comments, data]);
    });

    return () => {
      socket.off("newComment");
      socket.disconnect();
    };
  }, []);

  return (
    <Box>
      <Heading fontSize={"large"}>
        {comments.length} {t("item.comments")}
      </Heading>
      <Box
        ref={commentsContainerRef}
        display="flex"
        flexDirection="column"
        gap={2}
        marginY={5}
        maxHeight={"500px"}
        overflow={"scroll"}
      >
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <ItemComment key={`${comment._id}-${index}`} comment={comment} />
          ))
        ) : (
          <Text fontWeight={"bold"}>{t("item.noComments")}</Text>
        )}
      </Box>

      {currentUser._id !== "" && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <VStack boxSizing={"border-box"} alignItems={"start"}>
            <Textarea
              {...register("comment", {
                required: {
                  value: true,
                  message: "Comment is required",
                },
                maxLength: {
                  value: 300,
                  message: "Maximum length - 300 characters",
                },
              })}
              border={"1px solid"}
              borderColor={errors.comment ? "red.300" : "gray.300"}
            />
            <Text ml={"auto"} fontSize={"small"} color={"red.300"}>
              {errors.comment?.message}
            </Text>
            <Button type="submit" variant={"outline"} colorScheme={"green"}>
              {t("tools.submit")}
            </Button>
          </VStack>
        </form>
      )}
    </Box>
  );
};

export default ItemComments;
