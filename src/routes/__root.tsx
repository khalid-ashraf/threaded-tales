import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Navbar from "@/components/navbar";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className='flex min-h-full flex-col bg-white'>
        <Navbar />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});

