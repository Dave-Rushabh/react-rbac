import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultLoader from "../DefaultLoader";
const RBAC = ({ WrapperElem, LoadingElem, authData }) => {
    const Validator = () => {
        const { pathname } = useLocation();
        const navigate = useNavigate();
        const [shouldRender, setShouldRender] = useState(false);
        const { hasToken, onUnauthorizedPageRequest, roles, routes, redirects } = authData;
        // fetching the available roles from props
        const isAdmin = roles.isAdmin;
        const isMaintainer = roles.isMaintainer;
        const isSuperAdmin = roles?.isSuperAdmin ?? false;
        // fetching the available routes from the props
        const adminRoutes = routes.ADMIN_ROUTES;
        const protectedRoutes = routes.PROTECTED_ROUTES;
        const superAdminRoutes = routes?.SUPER_ADMIN_ROUTES ?? [];
        const authRoutes = routes.AUTH_ROUTES;
        // determining what is the route type of the current route
        const isAuthRoute = authRoutes.includes(pathname);
        const isAdminRoute = adminRoutes.includes(pathname);
        const isSuperAdminRoute = superAdminRoutes.includes(pathname);
        const isProtectedRoute = protectedRoutes.find((route) => pathname.startsWith(route) &&
            !isAdminRoute &&
            !isAuthRoute &&
            !isSuperAdminRoute);
        // determining the possible redirects
        const defaultRedirectLink = redirects.default;
        const superAdminRedirectLink = redirects?.superAdmin;
        const authRedirectLink = redirects.auth;
        // handles routing when given route is auth type
        const handleAuthRoutes = () => {
            if (hasToken) {
                if (isAdmin || isMaintainer) {
                    navigate(defaultRedirectLink, { replace: true });
                }
                else {
                    superAdminRedirectLink &&
                        navigate(superAdminRedirectLink, { replace: true });
                }
            }
            else {
                setShouldRender(true);
            }
        };
        // handles routing when given route is super admin type
        const handleSuperAdminRoutes = () => {
            if (hasToken) {
                if (isAdmin || isMaintainer) {
                    navigate(defaultRedirectLink, { replace: true });
                }
                else {
                    setShouldRender(true);
                }
            }
            else {
                setShouldRender(true);
            }
        };
        // handles routing when given route is protected type
        const handleProtectedRoutes = () => {
            if (hasToken) {
                if (isSuperAdmin) {
                    onUnauthorizedPageRequest();
                    navigate(authRedirectLink, { replace: true });
                }
                else {
                    setShouldRender(true);
                }
            }
            else {
                navigate(authRedirectLink, { replace: true });
            }
        };
        // handles routing when given route is admin type
        const handleAdminRoutes = () => {
            if (hasToken) {
                if (isMaintainer) {
                    navigate(defaultRedirectLink, { replace: true });
                }
                else if (isSuperAdmin) {
                    onUnauthorizedPageRequest();
                    navigate(authRedirectLink, { replace: true });
                }
            }
            else {
                navigate(authRedirectLink, { replace: true });
            }
        };
        useEffect(() => {
            if (isAuthRoute) {
                handleAuthRoutes();
            }
            else if (isSuperAdminRoute) {
                handleSuperAdminRoutes();
            }
            else if (isProtectedRoute) {
                handleProtectedRoutes();
            }
            else if (isAdminRoute) {
                handleAdminRoutes();
            }
            return () => {
                setShouldRender(false);
            };
        }, [hasToken]);
        return shouldRender ? (React.createElement(WrapperElem, null)) : (React.createElement(React.Fragment, null, LoadingElem ? React.createElement(LoadingElem, null) : React.createElement(DefaultLoader, null)));
    };
    return Validator;
};
export default RBAC;
