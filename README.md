# react-rbac-simplified

- A lightweight and flexible React component for client-side Role-Based Access Control (RBAC).Easily manage user permissions and restrict access to components based on roles like Admin, Maintainer, and Super Admin (optional).

## Installation

```bash
npm install react-rbac-simplified
```

## Usage

- `react-rbac-simplified` provides a simple component that wraps your React components and handles access control based on user roles and routes.

- ### Props

  ```javascript
  type RBAC_PROPS = {
    WrapperElem: React.FC,
    LoadingElem?: React.FC,
    authData: {
      hasToken: boolean,
      roles: {
        isAdmin: boolean,
        isMaintainer: boolean,
        isSuperAdmin?: boolean,
      },
      onUnauthorizedPageRequest: () => void,
      routes: {
        ADMIN_ROUTES: string[],
        PROTECTED_ROUTES: string[],
        SUPER_ADMIN_ROUTES?: string[],
        AUTH_ROUTES: string[],
      },
      redirects: {
        auth: string,
        default: string,
        superAdmin?: string,
      },
    },
  };
  ```

- `WrapperElem` (Required):

  - The React component that you want to protect with RBAC.
  - Example : `const MyProtectedComponent = () => <div>Protected Content</div>`

- `LoadingElem` (Required):

  - A React component to display while RBAC performs its checks and redirects.
  - This prevents unnecessary API calls from temporarily rendered components.
  - If not provided, a default loader will be used.

- `authData` (Required):

  - An object containing authentication and authorization information :

    - `hasToken` (boolean) : Indicates whether the user has an authentication token. You are responsible for verifying this.

    - `roles` (object) : Specifies the user's roles
      - `isAdmin` (boolean) : Indicates if the user is an admin.
      - `isMaintainer` (boolean) : Indicates if the user is a maintainer.
      - `isSuperAdmin` (boolean, optional) : Indicates if the user is a super admin. If your application doesn't have super admins, you can omit this.
    - `onUnauthorizedPageRequest` (function) : A function to handle unauthorized access attempts (e.g., logout, reset auth state).
    - `routes` (object) : Defines route access rules
      - `ADMIN_ROUTES` (string[]) : An array of routes accessible to admins (e.g., `["/admin", "/reports"]`).
      - `PROTECTED_ROUTES` (string[]) : An array of routes accessible to authenticated users (e.g., `["/profile", "/dashboard"]`).
      - `SUPER_ADMIN_ROUTES` (string[], optional) : An array of routes accessible to super admins (e.g., `["/super-admin"]`).
      - `AUTH_ROUTES` (string[]) : An array of authentication-related routes (e.g., `["/sign-in", "/sign-up"]`).
    - `redirects` (object) : Defines redirection rules
      - `auth` (string) : The route to redirect to when authentication is required (e.g., `"/sign-in"`).
      - `default` (string): The default route to redirect to after successful authentication (e.g., `"/dashboard"`).
      - `superAdmin` (string, optional) : The route to redirect to for super admins (e.g. `"/super-admin-dashboard"`).

## Example

```javascript
import React from "react";
import RBAC from "react-rbac-simplified";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Mock auth configuration (you should manage this dynamically)
const authConfig = {
  authData: {
    hasToken: false,
    roles: {
      isAdmin: false,
      isMaintainer: false,
      isSuperAdmin: false, // Optional
    },
    onUnauthorizedPageRequest: () => console.log("Unauthorized access!"),
    routes: {
      ADMIN_ROUTES: ["/admin", "/reports"],
      PROTECTED_ROUTES: ["/dashboard", "/profile"],
      SUPER_ADMIN_ROUTES: ["/super-admin"], // Optional
      AUTH_ROUTES: ["/sign-in", "/sign-up"],
    },
    redirects: {
      auth: "/sign-in",
      default: "/dashboard",
      superAdmin: "/super-admin-dashboard", // Optional
    },
  },
};

const Dashboard = () => <div>Dashboard Content</div>;
const AdminPanel = () => <div>Admin Panel Content</div>;
const SignIn = () => <div>Sign In Page</div>;

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/dashboard"
          element={RBAC({
            WrapperElem: Dashboard,
            authData: authConfig.authData,
          })}
        />
        <Route
          path="/admin"
          element={RBAC({
            WrapperElem: AdminPanel,
            authData: authConfig.authData,
          })}
        />
        <Route
          path="/sign-in"
          element={RBAC({ WrapperElem: SignIn, authData: authConfig.authData })}
        />
      </Routes>
    </Router>
  );
}

export default App;
```

## Important Notes

- You are responsible for managing the authData object and ensuring it's kept up-to-date with the user's authentication and authorization state using context APIs, Redux, or other state management solutions.
- Only components wrapped by the RBAC component will be protected. Components outside the wrapper will function normally.
- The Super Admin role is optional, and can be omitted.
- Ensure to update your auth config on route changes, or auth state changes.

## Author

<img src="https://avatars.githubusercontent.com/u/93786802?s=96&v=4" alt="Dave-Rushabh's github profile picture" style="border-radius: 50%;" width="100" height="100">

<br/>
Rushabh Dave

[![GitHub Profile](https://img.shields.io/badge/GitHub-Profile-blue?style=for-the-badge&logo=github)](https://github.com/Dave-Rushabh)

## Contributions

- Contributions are welcome! Please feel free to submit issues and pull requests.
