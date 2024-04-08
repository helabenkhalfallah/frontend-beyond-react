/* eslint-disable max-len */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// eslint-disable-next-line import/no-extraneous-dependencies
import { LazyLoadImage } from "react-lazy-load-image-component";
import ProductImgPlaceHolder from "./ProductImgPlaceHolder";

const ProductListRowWrapper = styled.article`
  .product__card {
    height: 140px;
    margin: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;

    &:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
    }
  }

  .product__image {
    width: 80px;
    height: 80px;
    aspect-ratio: 16 / 9;
    object-fit: scale-down;
    margin-top: 5px;
  }

  product__infos {
    display: flex;
    flex-direction: row;
    align-items: left;
  }

  .product__title {
    line-height: 15px;
    color: #20397f;
    font-size: 1rem;
    margin-left: 1rem;
  }

  .product__description {
    line-height: 20px;
    color: #060b19;
    font-size: 0.8rem;
    margin-left: 1rem;
  }

  .product__link {
    font-size: 0.8rem;
    margin-left: 2rem;
  }
`;

const ProductListRow = ({ item, style }) => {
  return (
    <ProductListRowWrapper role="row" style={style}>
      <div className="product__card">
        <LazyLoadImage
          className="product__image"
          role="cell"
          alt="Product Thumbnail"
          placeholder={<ProductImgPlaceHolder />}
          src={item?.thumbnail}
        />
        <div className="product__infos" role="cell">
          <h3 className="product__title">{item?.title}</h3>
          <p className="product__description">
            {`${item?.description?.slice?.(0, 60)} ...`}
          </p>
          <a className="product__link" href={`./product_details?id=${item.id}`}>
            Open Product Details
          </a>
        </div>
      </div>
    </ProductListRowWrapper>
  );
};

ProductListRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  style: PropTypes.shape({}),
};

ProductListRow.defaultProps = {
  item: null,
  style: {},
};

ProductListRow.displayName = "ProductListRow";

export default ProductListRow;
