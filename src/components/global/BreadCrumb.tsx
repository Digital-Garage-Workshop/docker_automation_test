"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { BreadcrumbItemType } from "@/redux/slices/breadcrumbSlice";

// translations.ts
export const breadcrumbTranslations: { [key: string]: string } = {
  home: "Нүүр",
  products: "Бүтээгдэхүүнүүд",
  cart: "Сагс",
  checkout: "Төлбөр",
  profile: "Профайл",
  "product-list": "Бүтээгдэхүүний дэлгэрэнгүй",
  category: "Ангилал",
  payment: "Төлбөр",
  "product-detail": "Бүтээгдэхүүний дэлгэрэнгүй",
  "sale-parts": "Хямдарсан сэлбэг",
};
const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const breadcrumbLabels = useSelector(
    (state: RootState) => state.breadcrumbs.breadcrumbLabels
  );

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([]);

  useEffect(() => {
    if (!pathname) return;

    const linkPath = pathname.split("?")[0].split("#")[0];
    const pathSegments = linkPath.split("/").filter((segment) => segment);

    const pathArray: BreadcrumbItemType[] = pathSegments.map(
      (segment, index) => {
        const href = "/" + pathSegments.slice(0, index + 1).join("/");
        const translatedLabel =
          breadcrumbLabels[href] || translateBreadcrumb(segment);

        return {
          label: translatedLabel,
          href: href,
          isCurrentPage: index === pathSegments.length - 1,
        };
      }
    );

    setBreadcrumbs(pathArray);
  }, [pathname, breadcrumbLabels]);

  const translateBreadcrumb = (segment: string): string => {
    // Use translation dictionary or fallback to formatting the segment
    return (
      breadcrumbTranslations[segment] ||
      segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
    );
  };

  return (
    <Breadcrumb
      spacing="16px"
      separator={"|"}
      mb={4}
      fontSize={{ base: 12, md: "sm" }}
      color="gray.600"
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/" color={"#1E1E1E"}>
          {breadcrumbTranslations["home"]}
        </BreadcrumbLink>
      </BreadcrumbItem>

      {breadcrumbs.map((crumb, index) => (
        <BreadcrumbItem key={crumb.href} isCurrentPage={crumb.isCurrentPage}>
          {crumb.isCurrentPage ? (
            <BreadcrumbLink color="#1E1E1E" as="span" fontWeight={600}>
              {crumb.label}
            </BreadcrumbLink>
          ) : (
            <BreadcrumbLink as={Link} href={crumb.href} color={"#1E1E1E"}>
              {crumb.label}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
