// components/ImageViewer.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Box, Grid, GridItem, Stack } from "@chakra-ui/react";
import Image from "next/image";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";


interface ImageViewerProps {
  mainImg: string;
  images?: { imgurl400: string }[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ mainImg, images = [] }) => {
  const [selectedImage, setSelectedImage] = useState<string>(mainImg);

  useEffect(() => {
    setSelectedImage(mainImg);
  }, [mainImg]);

  return (
    <Stack direction={["column", "row"]} spacing={6}>
      {/* Thumbnail Gallery */}
      <Grid
        templateColumns="repeat(1, 1fr)"
        gap={2}
        maxH="500px"
        overflowY="auto"
        pr={2}
      >
        {images.map((image, index) => (
          <GridItem key={index}>
            <Box
              border={
                selectedImage === image.imgurl400
                  ? "2px solid #F75B00"
                  : "1px solid #E2E2E2"
              }
              borderRadius="md"
              overflow="hidden"
              cursor="pointer"
              onClick={() => setSelectedImage(image.imgurl400)}
              _hover={{ borderColor: "#F75B00" }}
            >
              <img
                src={image.imgurl400 || "/product.svg"}
                alt={`Thumbnail ${index + 1}`}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                loading="lazy"
              />
            </Box>
          </GridItem>
        ))}
      </Grid>

      {/* Main Image with Zoom */}
      <Box flex="1">
        <InnerImageZoom
          src={selectedImage}
          zoomSrc={selectedImage}
       
          zoomType="hover" // Enables zoom on hover
          zoomPreload={true}
          fullscreenOnMobile={false}
          hideHint={true}
          className="custom-inner-image-zoom"
        />
      </Box>
    </Stack>
  );
};

export default ImageViewer;