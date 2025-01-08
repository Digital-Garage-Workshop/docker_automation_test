import { VStack, Grid, Divider, Skeleton } from "@chakra-ui/react";

export const GarageCompSkeleton = () => {
  return (
    <VStack
      spacing={4}
      align="stretch"
      w="full"
      p={6}
      boxShadow="0px 2.972px 29.719px 0px rgba(10, 6, 57, 0.05)"
    >
      {/* Large top skeleton */}
      <Skeleton
        height="160px"
        borderRadius="md"
        startColor="#F2F4F7"
        endColor="#F2F4F7"
      />

      {/* Medium skeleton */}
      <Skeleton
        height="32px"
        w="150px"
        borderRadius="md"
        startColor="#F2F4F7"
        endColor="#F2F4F7"
      />
      <Skeleton
        mt={-3}
        height="54px"
        borderRadius="md"
        startColor="#F2F4F7"
        endColor="#F2F4F7"
      />
      <Skeleton
        height="22px"
        borderRadius="md"
        startColor="#F2F4F7"
        endColor="#F2F4F7"
      />
      {/* Brand badge */}
      <Divider />
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            height="70px"
            borderRadius="md"
            startColor="#F2F4F7"
            endColor="#F2F4F7"
          />
        ))}
      </Grid>
    </VStack>
  );
};
