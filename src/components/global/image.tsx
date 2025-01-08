import { Box, chakra, BoxProps } from "@chakra-ui/react";
import NextImage, { ImageProps, ImageLoaderProps } from "next/image";

// Create a Chakra-wrapped Next.js Image component
const ChakraNextUnwrappedImage = chakra(NextImage, {
  shouldForwardProp: (prop) =>
    [
      "width",
      "height",
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader",
      "style",
    ].includes(prop),
});

// Custom loader function
const myLoader = (resolverProps: ImageLoaderProps): string => {
  return `${resolverProps.src}?w=${resolverProps.width}&q=${resolverProps.quality || 75}`;
};

// Function to create a shimmer effect for the blur placeholder
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const ChakraNextImage = (props: ImageProps & BoxProps) => {
  const { src, alt, width, height, quality, ...rest } = props;

  return (
    <Box position="relative" cursor="pointer" className="group" {...rest}>
      <ChakraNextUnwrappedImage
        loader={myLoader}
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        // placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(Number(width), Number(height)))}`}
        transition="all 0.2s"
        {...rest}
      />
    </Box>
  );
};
