import { Button, HStack } from "@chakra-ui/react";
import { BiSolidLike, BiLike } from "react-icons/bi";
import useErrorHandler from "../hooks/useError";
import { updateItem } from "../services/service";
import { useCollectionStore } from "../store/store";
import { ItemType } from "../types/types";

type LikeButtonProps = {
  item: ItemType;
};

const LikeButton = ({ item }: LikeButtonProps) => {
  const currentUser = useCollectionStore((state) => state.currentUser);
  const items = useCollectionStore((state) => state.items);
  const setItems = useCollectionStore((state) => state.setItems);

  const { handleFail } = useErrorHandler();

  const isLiked = item.likeIDs.includes(currentUser._id);

  const handleLike = () => {
    let updatedLike;
    if (isLiked) {
      updatedLike = item.likeIDs.filter((id) => id !== currentUser._id);
    } else {
      updatedLike = [...item.likeIDs, currentUser._id];
    }

    updateItem({
      ...item,
      likeIDs: updatedLike,
    })
      .then((res) => {
        setItems(
          items.map((item) => {
            if (item._id === res._id) {
              return res;
            }
            return item;
          })
        );
      })
      .catch((err) => {
        handleFail(err.message.toString());
      });
  };
  return (
    <HStack gap={2}>
      <Button
        variant="ghost"
        leftIcon={isLiked ? <BiSolidLike /> : <BiLike />}
        colorScheme={isLiked ? "yellow" : "white"}
        onClick={handleLike}
        padding={0}
      >
        {item.likeIDs.length}
      </Button>
    </HStack>
  );
};

export default LikeButton;
