import { useDispatch, useSelector } from "react-redux";

import { VStack, Checkbox, Text, HStack, Box } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { UseApi } from "@/hooks/useApi";
import { setAttrValueIds } from "@/redux/slices/filterSlice";
import Skeleton from "react-loading-skeleton";
import { GetSaleFilter } from "@/services/sale_parts/GetSaleFilters";

type FiltersProps = {
  categoryId: string;
};

export const SalePartsFilters = ({ categoryId }: FiltersProps) => {
  const dispatch = useDispatch();

  const { attrValueIds, articleIds } = useSelector(
    (state: any) => state.filter
  );

  const [{ data, isLoading: filterLoader, error: filterError }, fetchFilter] =
    UseApi({
      service: GetSaleFilter,
    });

  const handleCheckboxChange = (isChecked: boolean, attrId: number) => {
    if (isChecked) {
      dispatch(setAttrValueIds([...attrValueIds, attrId]));
    } else {
      dispatch(
        setAttrValueIds(attrValueIds.filter((id: number) => id !== attrId))
      );
    }
  };

  useEffect(() => {
    if (articleIds.length == 0) return;
    fetchFilter({
      articleIds,
      categoryId,
    });
  }, [articleIds, categoryId]);

  const filters = useMemo(() => data || [], [data]);

  if (filterLoader)
    return <Skeleton width={"300px"} height={"120px"} count={5} />;

  return (
    <VStack w="300px">
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        display={attrValueIds.length != 0 ? "flex" : "none"}
      >
        {attrValueIds.length != 0 ? (
          <Text
            onClick={() => dispatch(setAttrValueIds([]))}
            fontSize={12}
            color="#F75B00"
            cursor={"pointer"}
            decoration={"underline"}
          >
            Цэвэрлэх
          </Text>
        ) : (
          <Box />
        )}
      </HStack>
      {filters.map((item: any, index: number) => (
        <VStack
          border={"1px solid #E4E7EC"}
          borderRadius={"8px"}
          key={index}
          width="100%"
          p={2}
          align="flex-start"
          bg="white"
          gap={0}
        >
          <HStack
            w={"full"}
            gap={"16px"}
            justifyContent={"space-between"}
            p="10px 16px"
          >
            <Text fontSize={14} fontWeight={700}>
              {item.name}
            </Text>
          </HStack>
          <VStack align="flex-start" gap={0}>
            {item.options.map((option: any) => (
              <Checkbox
                key={option.attrvalueid}
                isChecked={attrValueIds.includes(option.attrvalueid)}
                onChange={(e) =>
                  handleCheckboxChange(e.target.checked, option.attrvalueid)
                }
                sx={{
                  ".chakra-checkbox__control": {
                    width: "16px",
                    height: "16px",
                    minWidth: "16px",
                    minHeight: "16px",
                    borderColor: "#CFCFCF",
                  },
                }}
                p="10px 16px"
              >
                <Text fontWeight={500} fontSize={14}>
                  {option.name}
                </Text>
              </Checkbox>
            ))}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
};
