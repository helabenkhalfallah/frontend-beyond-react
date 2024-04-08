import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// eslint-disable-next-line import/no-extraneous-dependencies
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import ProductLoader from "./ProductLoader";

const ProductListRow = lazy(() => import("./ProductListRow"));

const ProductListSection = styled.section`
  font-family: Arial, sans-serif;
  display: block;
  width: 100%;

  .product__list--title {
    color: #192e66;
    font-size: 1.25rem;
    text-align: center;
  }

  .product__list {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 800px;
  }
`;

const ProductList = ({
  data,
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
}) => {
  const itemCount =
    (hasNextPage && data?.length ? data.length + 1 : data?.length) || 0;
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const isItemLoaded = (index) => !hasNextPage || index < data?.length;

  return (
    <Suspense fallback={<ProductLoader />}>
      <ProductListSection>
        <h2 className="product__list--title">Product List</h2>
        <div className="product__list" role="grid">
          {itemCount === 0 && <span>No Data</span>}
          {itemCount > 0 && (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  ref={ref}
                  itemCount={itemCount}
                  itemSize={150}
                  height={800}
                  width={800}
                  onItemsRendered={onItemsRendered}
                >
                  {({ index, style }) => {
                    if (!isItemLoaded(index)) {
                      return <ProductLoader />;
                    }
                    return (
                      <ProductListRow style={style} item={data?.[index]} />
                    );
                  }}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </div>
      </ProductListSection>
    </Suspense>
  );
};

ProductList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      thumbnail: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  hasNextPage: PropTypes.bool,
  isNextPageLoading: PropTypes.bool,
  loadNextPage: PropTypes.func,
};

ProductList.defaultProps = {
  data: null,
  hasNextPage: false,
  isNextPageLoading: false,
  loadNextPage: () => {},
};

ProductList.displayName = "ProductList";

export default ProductList;
