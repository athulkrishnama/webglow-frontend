import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { ROLES } from '../constants/roles.constant';

interface RouterContext {
  isLoggedin: () => boolean;
  checkRole: (role: ROLES) => boolean;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
})
