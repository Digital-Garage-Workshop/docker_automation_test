"use client";
import {
  VStack,
  Text,
  Button,
  Spinner,
  Grid,
  GridItem,
  Box,
  HStack,
} from "@chakra-ui/react";
import {CatalogCard} from "./index";
import {DownArrow} from "@/icons";
import {UseApi} from "@/hooks/useApi";
import {Category as _Category} from "@/services/category/category";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {SubCategory} from "@/services";
import {useSelector} from "react-redux";

export const Catalog = () => {
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState<number | null>(
    null
  ); // Track which category is open

  const router = useRouter();

  const [{data, isLoading}, fetch] = UseApi({
    service: _Category,
  });
  const {carId} = useSelector((state: any) => state.car);
  useEffect(() => {
    fetch();
  }, []);

  const [{data: subCategory, isLoading: subLoader}, subCategoryFetch] = UseApi({
    service: SubCategory,
  });

  const toggleSubcategory = (categoryid: number, index: number) => {
    setIsSubcategoryOpen(isSubcategoryOpen === index ? null : index); // Toggle open/close

    if (carId !== undefined) {
      subCategoryFetch({
        categoryid: categoryid,
        carid: carId,
      });
    }
  };

  return (
    <VStack gap="32px" w="100%">
      <Text fontWeight={700} color="#1E1E1E" fontSize="28px">
        Category
      </Text>

      <Button
        variant="filled"
        padding="18px 10px"
        maxWidth="161px"
        fontWeight={700}
        fontSize={14}
        color="#F75B00"
        rightIcon={<DownArrow w="20" h="20" color="#F75B00" />}
        onClick={() => router.push("/category")}
      >
        More brands
      </Button>

      {isLoading ? (
        <Spinner size="xl" color="#F75B00" />
      ) : (
        <Grid
          templateColumns="repeat(6, 1fr)" // 6 columns per row
          gap={4} // Gap between cards
          w="full"
          position="relative"
        >
          {data?.map((item: any, index: number) => (
            <>
              {/* Main card for each category */}
              <GridItem
                key={index}
                cursor="pointer"
                onClick={() => toggleSubcategory(item.categoryid, index)}
                border="1px solid"
                borderColor={
                  isSubcategoryOpen === index ? "#F75B00" : "transparent"
                }
                pos="relative"
              >
                <CatalogCard
                  {...item}
                  isSubcategoryOpen={isSubcategoryOpen === index}
                />
              </GridItem>

              {/* Expanded subcategories - Full Width */}
              {isSubcategoryOpen === index ? (
                (index + 1) % 6 === 0 ? (
                  <>
                    <GridItem colSpan={6} w="100%" bg={"red"}>
                      <Box
                        w="100%"
                        mt={4}
                        p={4}
                        bg="white"
                        border="1px solid #F75B00"
                        borderRadius="8px"
                      >
                        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                          {subCategory?.map((sub: any, subIndex: number) => (
                            <GridItem key={subIndex}>
                              <HStack>
                                <Text>{sub.name}</Text>
                              </HStack>
                            </GridItem>
                          ))}
                        </Grid>
                      </Box>
                    </GridItem>
                  </>
                ) : (
                  <>
                    {[
                      ...Array(
                        (index + 1) % 6 === 0 ? 0 : 6 - ((index + 1) % 6)
                      ),
                    ].map(() => {
                      return (
                        <GridItem
                          key={index}
                          cursor="pointer"
                          onClick={() =>
                            toggleSubcategory(item.categoryid, index)
                          }
                          border="1px solid"
                          borderColor={
                            isSubcategoryOpen === index
                              ? "#F75B00"
                              : "transparent"
                          }
                          pos="relative"
                        >
                          <CatalogCard
                            {...item}
                            isSubcategoryOpen={isSubcategoryOpen === index}
                          />
                        </GridItem>
                      );
                    })}
                    <GridItem colSpan={6} w="100%">
                      <Box
                        w="100%"
                        mt={4}
                        p={4}
                        bg="white"
                        border="1px solid #F75B00"
                        borderRadius="8px"
                      >
                        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                          {subCategory?.map((sub: any, subIndex: number) => (
                            <GridItem key={subIndex}>
                              <HStack>
                                <Text>{sub.name}</Text>
                              </HStack>
                            </GridItem>
                          ))}
                        </Grid>
                      </Box>
                    </GridItem>
                  </>
                )
              ) : null}
            </>
          ))}
        </Grid>
      )}
    </VStack>
  );
};
