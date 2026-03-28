import type { ReactNode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../router";

export const AppProviders: React.FC<{ children?: ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <RouterProvider router={router} />
    </>
  );
};
