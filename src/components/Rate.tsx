import React from "react";
import { HStack, StackProps, border } from "@chakra-ui/react";
import { StarIcon } from "@/icons";

const totalStars = 5;

interface RateProps extends StackProps {
  rank: number;
  fill: string;
  w: string;
  h: string;
  stroke?: string;
}

const Rate: React.FC<RateProps> = ({
  rank,
  fill,
  w,
  h,
  stroke,
  ...stackProps
}) => {
  return (
    <HStack spacing={1} {...stackProps}>
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          color={index < rank ? fill : ""}
          aria-label={`Rate ${index + 1}`}
          w={w}
          h={h}
          stroke={stroke || ""}
        />
      ))}
    </HStack>
  );
};

export default Rate;
