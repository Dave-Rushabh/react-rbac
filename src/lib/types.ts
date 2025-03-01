type RBAC_PROPS = {
  WrapperElem: React.FC;
  LoadingElem?: React.FC;
  authData: {
    hasToken: boolean;
    roles: {
      isAdmin: boolean;
      isMaintainer: boolean;
      isSuperAdmin?: boolean;
    };
    onUnauthorizedPageRequest: () => void;
    routes: {
      ADMIN_ROUTES: string[];
      PROTECTED_ROUTES: string[];
      SUPER_ADMIN_ROUTES?: string[];
      AUTH_ROUTES: string[];
    };
    redirects: {
      auth: string;
      default: string;
      superAdmin?: string;
    };
  };
};
