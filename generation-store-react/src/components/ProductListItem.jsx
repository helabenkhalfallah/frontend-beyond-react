import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

const ProductListItem = ({ product }) => (
  <Box p={5} width="780px" h="180px" shadow="sm" borderWidth="1px">
    <Heading as="h2">{product.title}</Heading>
    <Stack direction="row">
      <LazyLoadImage
        alt="Product Thumbnail"
        width={150}
        height={150}
        placeholder={<Box bg="gray" w="150px" h="150px" />}
        src={product.thumbnail}
        style={{
          aspectRatio: "16 / 9",
          objectFit: "scale-down",
        }}
      />
      <Box mr="md">
        <Text noOfLines={1} mt={2}>
          {product.description}
        </Text>
        <Text noOfLines={1} mt={2} fontWeight="semibold">
          Price: ${product.price}
        </Text>
      </Box>
    </Stack>
  </Box>
);

export default ProductListItem;
