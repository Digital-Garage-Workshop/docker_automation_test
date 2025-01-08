import {DownArrow, RightArrow} from "@/icons";
import {Stack} from "@chakra-ui/react";

export const NextButton = (props: {rotateAngle: string}) => {
  const {rotateAngle} = props;
  return (
    <Stack
      p={"4px"}
      bg="white"
      border="1px solid #EDEDED"
      sx={{transform: `rotate(${rotateAngle})`}}
    >
      <DownArrow color="#354052" w="24" h="24" />
    </Stack>
  );
};
