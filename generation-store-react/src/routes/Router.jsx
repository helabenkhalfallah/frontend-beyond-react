import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LazyRoute from "./LazyRoutes";
import Path from "./Path";

const queryClient = new QueryClient();

const { PRODUCT_LIST_PATH } = Path;

const { ProductListPage } = LazyRoute;

const Router = () => (
  <Suspense fallback={<div>Loading</div>}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={PRODUCT_LIST_PATH} element={<ProductListPage />} />
          <Route path="/" element={<Navigate replace to={ProductListPage} />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </Suspense>
);

export default Router;
