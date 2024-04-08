import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { onCLS, onFID, onLCP } from "web-vitals";
import ProductLoader from "../components/ProductLoader";

const ProductListHeader = lazy(() => import("../components/ProductListHeader"));
const ProductListFooter = lazy(() => import("../components/ProductListFooter"));
const ProductListBody = lazy(() => import("../components/ProductListBody"));
const ProductListView = lazy(() => import("../components/ProductListView"));
const ProductListTitle = lazy(() => import("../components/ProductListTitle"));

const ProductListPage = () => {
  const [
    currentPage, //
    setCurrentPage,
  ] = useState(0);
  const [
    productDataSource, //
    setProductDataSource,
  ] = useState([]);

  const { isLoading, data, refetch } = useQuery(
    {
      queryKey: ["repoData"],
      queryFn: () =>
        axios
          .get(`https://dummyjson.com/products?skip=${currentPage}&limit=10`)
          .then((response) => response?.data),
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    // eslint-disable-next-line no-console
    onCLS(console.log);
    // eslint-disable-next-line no-console
    onFID(console.log);
    // eslint-disable-next-line no-console
    onLCP(console.log);

    // first fetch
    refetch();
  }, []);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    setProductDataSource([
      ...(productDataSource || []),
      ...(data?.products || []),
    ]);
  }, [data]);

  return (
    <Suspense fallback={<ProductLoader />}>
      <ProductListHeader>
        <ProductListTitle>Next generation Store (React)</ProductListTitle>
      </ProductListHeader>
      <ProductListBody>
        <ProductListView
          data={productDataSource}
          hasNextPage={currentPage < data?.total}
          isNextPageLoading={isLoading}
          loadNextPage={(page) => {
            setCurrentPage(page);
          }}
        />
      </ProductListBody>
      <ProductListFooter>
        <span className="page__copyright">© POC Application</span>
        <span className="page__copyright">
          Benchmarking Frontend Frameworks/APIs
        </span>
      </ProductListFooter>
    </Suspense>
  );
};

ProductListPage.propTypes = {};

ProductListPage.defaultProps = {};

ProductListPage.displayName = "ProductListPage";

export default ProductListPage;
