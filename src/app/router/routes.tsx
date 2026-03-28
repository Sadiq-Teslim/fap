import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../../shared/constants";
import { PartnerProtectedRoute } from "./ProtectedRoute";

// Lazy load pages for better performance
import { lazy, Suspense } from "react";
import { Loading } from "../../shared/ui";

const Home = lazy(() => import("../../pages/home"));
const Ecosystem = lazy(() =>
  import("../../pages/ecosystem").then((m) => ({ default: m.EcosystemPage })),
);
const EpisodeOne = lazy(() =>
  import("../../pages/episode-one").then((m) => ({
    default: m.EpisodeOnePage,
  })),
);
const SAC1POSBridge = lazy(() =>
  import("../../pages/episode-one").then((m) => ({
    default: m.SAC1POSBridgePage,
  })),
);
const DigitalAssets = lazy(() =>
  import("../../pages/episode-one").then((m) => ({
    default: m.DigitalAssetsPage,
  })),
);
const Partnership = lazy(() => import("../../pages/partnership"));
const Roadmap = lazy(() =>
  import("../../pages/partnership").then((m) => ({ default: m.RoadmapPage })),
);
const Contact = lazy(() => import("../../pages/contact"));
const PartnerLogin = lazy(() =>
  import("../../pages/partner-portal").then((m) => ({
    default: m.PartnerLoginPage,
  })),
);
const PartnerDashboard = lazy(() =>
  import("../../pages/partner-portal").then((m) => ({
    default: m.PartnerDashboardPage,
  })),
);
const NotFound = lazy(() =>
  import("../../pages/home").then((m) => ({ default: m.NotFoundPage })),
);

const LoadingFallback = () => <Loading centered text="Loading..." />;

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: ROUTES.ECOSYSTEM,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Ecosystem />
      </Suspense>
    ),
  },
  {
    path: ROUTES.EPISODE_ONE,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <EpisodeOne />
      </Suspense>
    ),
  },
  {
    path: ROUTES.SAC1_POS_BRIDGE,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SAC1POSBridge />
      </Suspense>
    ),
  },
  {
    path: ROUTES.DIGITAL_ASSETS,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <DigitalAssets />
      </Suspense>
    ),
  },
  {
    path: ROUTES.PARTNERSHIP,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Partnership />
      </Suspense>
    ),
  },
  {
    path: ROUTES.ROADMAP,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Roadmap />
      </Suspense>
    ),
  },
  {
    path: ROUTES.CONTACT,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
    ),
  },

  // Partner Portal Routes
  {
    path: ROUTES.PARTNER_LOGIN,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PartnerLogin />
      </Suspense>
    ),
  },
  {
    path: ROUTES.PARTNER_PORTAL,
    element: (
      <PartnerProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <PartnerDashboard />
        </Suspense>
      </PartnerProtectedRoute>
    ),
  },
  {
    path: ROUTES.PARTNER_DASHBOARD,
    element: (
      <PartnerProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <PartnerDashboard />
        </Suspense>
      </PartnerProtectedRoute>
    ),
  },

  // Catch-all
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
