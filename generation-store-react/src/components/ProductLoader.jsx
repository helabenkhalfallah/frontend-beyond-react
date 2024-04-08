import styled from "styled-components";

const ProductLoader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px #3498db solid;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  animation: spin 2s linear infinite;
  margin-left: 50%;
  margin-top: 10%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default ProductLoader;
