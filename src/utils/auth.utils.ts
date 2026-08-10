import { store } from '../store/store';
import { ROLES } from '../constants/roles.constant';

export const hasRoleAccess = (allowedRoles: ROLES[]): boolean => {
  const state = store.getState();
  const { user, isAuthenticated } = state.auth;

  if (!isAuthenticated || !user) {
    return false;
  }

  return allowedRoles.includes(user.role);
};
