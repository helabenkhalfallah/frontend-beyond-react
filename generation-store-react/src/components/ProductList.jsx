import React, { lazy, Suspense } from "react";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import { Center, Spinner } from "@chakra-ui/react";

const ProductListItem = lazy(() => import("./ProductListItem"));

const ProductList = ({
  isLoading, //
  products, //
  hasNextPage, //
  itemsCount, //
  loadNextPage,
}) => {
  const loadMoreItems = isLoading ? () => { } : loadNextPage;
  const isItemLoaded = (index) =>
    !hasNextPage || index < (products || []).length;

  return (
    <Center bg="white" w="100%" h="90%">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        loadMoreItems={loadMoreItems}
        itemCount={itemsCount}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            ref={ref}
            itemCount={itemsCount}
            itemSize={200}
            height={600}
            width={800}
            onItemsRendered={onItemsRendered}
          >
            {({ index, style }) => {
              if (!isItemLoaded(index)) {
                return <Spinner size="lg" />;
              }

              const product = products[index];
              return (
                <div style={style}>
                  <Suspense fallback={<Spinner size="lg" />}>
                    <ProductListItem product={product} />
                  </Suspense>
                </div>
              );
            }}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </Center>
  );
};

export default ProductList;
