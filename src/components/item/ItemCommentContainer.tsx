import {
  Box,
  Button,
  Heading,
  Textarea,
  VStack,
  Text,
  Accordion,
} from "@chakra-ui/react";
import ItemComment from "./ItemComment";
import { useForm } from "react-hook-form";
import { newComment, postComment } from "../../services/comment";
import { useParams } from "react-router-dom";
import useErrorHandler from "../../hooks/useError";
import { useCollectionStore } from "../../store/store";

const ItemComments = () => {
  const itemID = useParams().id || "";
  const comments = useCollectionStore((state) => state.comments);
  const setComments = useCollectionStore((state) => state.setComments);
  const currentUser = useCollectionStore((state) => state.currentUser);
  const form = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { handleFail } = useErrorHandler();

  const onSubmit = (formData: newComment) => {
    console.log(formData);
    postComment(itemID, formData)
      .then((data) => {
        setComments([...comments, data]);
        form.reset();
      })
      .catch((err) => {
        const errorMessage = err.message.toString();
        handleFail(errorMessage);
      });
  };

  return (
    <Box>
      <Heading fontSize={"large"}>Comments:</Heading>
      <Accordion marginY={5} defaultIndex={[0]} allowMultiple>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <ItemComment key={`${comment._id}-${index}`} comment={comment} />
          ))
        ) : (
          <Text fontWeight={"bold"}>No Comments yet.</Text>
        )}
      </Accordion>
      {currentUser && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <VStack boxSizing={"border-box"} alignItems={"start"}>
            <Textarea
              {...register("comment", {
                required: {
                  value: true,
                  message: "Comment is required",
                },
              })}
              border={"1px solid"}
              borderColor={errors.comment ? "red.300" : "gray.300"}
            />
            <Text ml={"auto"} fontSize={"small"} color={"red.300"}>
              {errors.comment?.message}
            </Text>
            <Button type="submit" variant={"outline"} colorScheme={"green"}>
              Submit
            </Button>
          </VStack>
        </form>
      )}
    </Box>
  );
};

export default ItemComments;
