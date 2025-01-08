"use client";
import {
  Grid,
  GridItem,
  Stack,
  VStack,
  Text,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import { NoCarCard } from "../SearchCards";
import { useEffect, useState } from "react";
import { DownArrow } from "@/icons";
import { UseApi } from "@/hooks/useApi";
import { Category, SubCategory } from "@/services";
import { useRouter } from "next/navigation";
import { CatalogGrid } from "../catalog";

export const SuggestedParts = () => {
  const [dataNumber, setDataNumber] = useState(6); // For controlling how many categories are shown
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState<number | null>(
    null
  );
  const [clickedRow, setClickedRow] = useState<number | null>(null);
  const [clickedSubcategory, setClickedSubcategory] = useState<number>(1);
  const [subCategoryData, setSubCategoryData] = useState<any[]>([]); // Store subcategory data

  const router = useRouter();

  const [{ data, isLoading, error }, fetch] = UseApi({
    service: Category,
  });

  const [{ data: subCategory, isLoading: subLoader }, subCategoryFetch] =
    UseApi({
      service: SubCategory,
    });

  useEffect(() => {
    fetch(); // Fetch categories initially
  }, []);

  // Handle click event for main categories
  const toggleSubcategory = (categoryid: number, index: number) => {
    setIsSubcategoryOpen(index);
    setClickedSubcategory(categoryid);
    const row = Math.floor(index / 6);
    setClickedRow(row);

    const searchedCar =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("searchedCar") || "")
        : null;
    const carid = Number(searchedCar?.car);

    if (carid) {
      subCategoryFetch({
        categoryid: categoryid,
        carid: carid,
      }).then(() => setSubCategoryData(subCategory));
    } else {
      subCategoryFetch({
        categoryid: categoryid,
      }).then(() => setSubCategoryData(subCategory));
    }
  };

  const jumpSubCategory = (categoryid: number) => {
    const searchedCar =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("searchedCar") || "")
        : null;
    const carid = Number(searchedCar?.car);

    if (carid) {
      router.push(`/product-list/${categoryid}`);
    } else {
      router.push(`/category/${categoryid}`);
    }
  };

  // Handle load more click
  const handleClick = () => {
    dataNumber >= data.length
      ? setDataNumber(6)
      : setDataNumber((prev) => prev + 6);
  };

  return (
    <VStack gap="32px" w="100%">
      <Stack gap="8px" alignItems="flex-start" w="100%">
        <Text fontWeight={700} color="#1E1E1E" fontSize="20px">
          Сэлбэгийн каталог: Агаар шүүгч болон бусад олон эд анги, дагалдах
          хэрэгсэл санал болгож байна.
        </Text>
        <Text maxWidth="550px">
          Таны машинд зориулсан автомашины сэлбэг хэрэгсэл
        </Text>
      </Stack>

      <CatalogGrid isAll={false} isExpandable={true} data={data} />
    </VStack>
  );
};
