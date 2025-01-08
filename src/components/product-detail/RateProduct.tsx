"use client";
import React, {useState} from "react";
import {HStack, Stack} from "@chakra-ui/react";
import {StarIcon} from "@/icons";

const totalStars = 5;

export const RateProduct = (props: {
  rank: number;
  fill: string;
  w: string;
  h: string;
  onRate: (rate: number) => void;
}) => {
  const {rank, fill, w, h, onRate} = props;

  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number>(rank);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setCurrentRating(newRating);
    onRate(newRating);
  };

  return (
    <HStack gap={1}>
      {[...Array(totalStars)].map((_, index) => (
        <Stack
          key={index}
          cursor="pointer"
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          <StarIcon
            color={
              index < (hoveredRating !== null ? hoveredRating : currentRating)
                ? fill
                : "gray.300"
            }
            aria-label={`Rate ${index + 1}`}
            stroke={fill}
            w={w}
            h={h}
          />
        </Stack>
      ))}
    </HStack>
  );
};
