import {
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <Card height={"580px"}>
      <CardHeader>
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
      </CardHeader>
      <CardBody>
        <Skeleton height={"300px"} />
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default CardSkeleton;
