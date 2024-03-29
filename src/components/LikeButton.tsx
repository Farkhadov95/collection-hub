import { Button, HStack, Spinner } from "@chakra-ui/react";
import { BiSolidLike, BiLike } from "react-icons/bi";
import useErrorHandler from "../hooks/useError";
import { updateLike } from "../services/service";
import { useCollectionStore } from "../store/store";
import { ItemType } from "../types/types";
import { useState } from "react";

type LikeButtonProps = {
  item: ItemType;
};

const LikeButton = ({ item }: LikeButtonProps) => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);
  const userItems = useCollectionStore((state) => state.userItems);
  const setUserItems = useCollectionStore((state) => state.setUserItems);
  const [isLoading, setIsLoading] = useState(false);
  const { handleFail } = useErrorHandler();

  const isLiked = item.likeIDs.includes(currentUser._id);

  const handleLike = () => {
    setIsLoading(true);
    updateLike(item._id)
      .then((res) => {
        setItems(
          items.map((item) => {
            if (item._id === res._id) {
              return res;
            }
            return item;
          })
        );
        setUserItems(
          userItems.map((item) => {
            if (item._id === res._id) {
              return res;
            }
            return item;
          })
        );
        setIsLoading(false);
      })
      .catch((err) => {
        handleFail(err.message.toString());
        setIsLoading(false);
      });
  };
  return (
    <HStack gap={2}>
      {isLoading ? (
        <Spinner mr={4} />
      ) : (
        <Button
          variant="ghost"
          leftIcon={isLiked ? <BiSolidLike /> : <BiLike />}
          colorScheme={isLiked ? "yellow" : "white"}
          onClick={handleLike}
          padding={0}
        >
          {item.likeIDs.length}
        </Button>
      )}
    </HStack>
  );
};

export default LikeButton;
