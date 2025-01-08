// hooks/useMetadata.ts
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
}

export const useMetadata = ({
  title,
  description,
  image,
  keywords,
}: MetadataProps) => {
  const pathname = usePathname();

  useEffect(() => {
    // Update title
    document.title = title ? `${title} | Digital Garage` : "Digital Garage";

    // Helper function with proper type casting
    const getOrCreateMetaTag = (
      name: string,
      isProperty: boolean = false
    ): HTMLMetaElement => {
      const attributeName = isProperty ? "property" : "name";
      let tag = document.querySelector(
        `meta[${attributeName}="${name}"]`
      ) as HTMLMetaElement;

      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attributeName, name);
        document.head.appendChild(tag);
      }

      return tag;
    };

    // Find or create meta tags with proper typing
    const metaTags = {
      description: getOrCreateMetaTag("description"),
      keywords: getOrCreateMetaTag("keywords"),
      "og:title": getOrCreateMetaTag("og:title", true),
      "og:description": getOrCreateMetaTag("og:description", true),
      "og:image": getOrCreateMetaTag("og:image", true),
      "twitter:title": getOrCreateMetaTag("twitter:title", true),
      "twitter:description": getOrCreateMetaTag("twitter:description", true),
      "twitter:image": getOrCreateMetaTag("twitter:image", true),
    };

    // Update meta tags
    if (description) {
      metaTags.description.content = description;
      metaTags["og:description"].content = description;
      metaTags["twitter:description"].content = description;
    }

    if (keywords) {
      metaTags.keywords.content = keywords;
    }

    if (title) {
      metaTags["og:title"].content = title;
      metaTags["twitter:title"].content = title;
    }

    if (image) {
      metaTags["og:image"].content = image;
      metaTags["twitter:image"].content = image;
    }
  }, [title, description, image, keywords, pathname]);
};
