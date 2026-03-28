import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store";
import { ROUTES } from "../../shared/constants";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: "pioneer" | "developer" | "partner" | "admin";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <>{children}</>;
};

interface PartnerProtectedRouteProps {
  children: ReactNode;
}

export const PartnerProtectedRoute: React.FC<PartnerProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.PARTNER_LOGIN} replace />;
  }

  if (user?.role !== "partner" && user?.role !== "admin") {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <>{children}</>;
};
