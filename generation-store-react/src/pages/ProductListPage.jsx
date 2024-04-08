import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Center, Box, Heading, Input, Spinner } from "@chakra-ui/react";

const ProductList = lazy(() => import("../components/ProductList"));

const fetchProducts = (page = 1) => {
  return axios
    .get(`https://dummyjson.com/products?skip=${page}&limit=10`)
    .then((response) => response.data);
};

const ProductListPage = () => {
  const [
    searchTerm, //
    setSearchTerm, //
  ] = useState("");
  const [
    page, //
    setPage, //
  ] = useState(1);
  const [
    productDataSource, //
    setProductDataSource,
  ] = useState([]);

  // Use React Query's useQuery hook to fetch product data
  const {
    data,
    isLoading, //
    refetch, //
  } = useQuery(
    {
      queryKey: ["products", page],
      queryFn: () => fetchProducts(page),
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    // first fetch
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    setProductDataSource([
      ...(productDataSource || []),
      ...(data?.products || []),
    ]);
  }, [data]);

  // Fetch more products when "Load More" button is clicked
  const loadNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Handle Search Product
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products based on search term
  const filteredProducts = productDataSource
    ? productDataSource.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const hasNextPage = data ? page < data.total : false;
  const itemsCount =
    (hasNextPage && filteredProducts && filteredProducts?.length
      ? filteredProducts.length + 1
      : filteredProducts?.length) || 0;

  return (
    <Suspense fallback={<Spinner size="lg" />}>
      <Box>
        <Center bg="white" w="100%" mt="5">
          <Heading as="h1">Product List</Heading>
        </Center>
        <Center bg="white" w="100%" mt="5" mb="5">
          <Input
            w="750px"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Center>
        {itemsCount > 0 && (
          <ProductList
            isLoading={isLoading}
            products={filteredProducts}
            hasNextPage={hasNextPage}
            itemsCount={itemsCount}
            loadNextPage={loadNextPage}
          />
        )}
      </Box>
    </Suspense>
  );
};

export default ProductListPage;
