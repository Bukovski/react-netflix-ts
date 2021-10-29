import React from 'react';
import { Route, Redirect } from 'react-router-dom';


interface IPathProtection {
  user?: {
    name: string
  } | null,
  loggedInPath?: string,
  children: JSX.Element | JSX.Element[] | React.ReactNode,
  [ restProps: string ]: any
}


export function IsUserRedirect({ user, loggedInPath, children, ...rest }: IPathProtection) {
  return (
    <Route
      { ...rest }
      render={ () => {
        if (!user) return children;

        if (user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}

export function ProtectedRoute({ user, children, ...rest }: IPathProtection) {
  return (
    <Route
      {...rest}
      render={ ({ location }) => {
        if (user) return children;

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: 'signin',
                state: { from: location },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
}
