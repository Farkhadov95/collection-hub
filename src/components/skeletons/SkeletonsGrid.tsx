import { SimpleGrid } from "@chakra-ui/react";
import CardSkeleton from "./CardSkeleton";

const SkeletonsGrid = () => {
  const skeletons = [...Array(4)];
  return (
    <SimpleGrid columns={4} gap={5} width={"100%"}>
      {skeletons.map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </SimpleGrid>
  );
};

export default SkeletonsGrid;
