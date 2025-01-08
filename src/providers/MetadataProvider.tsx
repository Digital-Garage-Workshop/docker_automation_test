"use client";

import { createContext, useContext } from "react";

interface MetadataContextType {
  setMetadata: (metadata: MetadataProps) => void;
}

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
}

const MetadataContext = createContext<MetadataContextType>({
  setMetadata: () => {},
});

export function MetadataProvider({ children }: { children: React.ReactNode }) {
  const setMetadata = ({
    title,
    description,
    image,
    keywords,
  }: MetadataProps) => {
    document.title = title ? `${title} | Digital Garage` : "Digital Garage";

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("twitter:title", title, true);
    updateMetaTag("twitter:description", description, true);
    updateMetaTag("twitter:image", image, true);
  };

  return (
    <MetadataContext.Provider value={{ setMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
}

export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error("useMetadata must be used within a MetadataProvider");
  }
  return context;
};

function updateMetaTag(
  name: string,
  content?: string,
  isProperty: boolean = false
) {
  if (!content) return;

  const attributeName = isProperty ? "property" : "name";
  let tag = document.querySelector(`meta[${attributeName}="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attributeName, name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}
