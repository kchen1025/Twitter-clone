import * as React from 'react';

export interface HelloProps {
  compiler: string;
  framework: string;
}

export const Hello = (props: HelloProps) => {
  return (
    <React.Fragment>
      <div>
        <h1>
          Hello from {props.compiler} and {props.framework}!
        </h1>
        <div><a href="/api">Backend API endsdfspoint.</a></div>
        <div><a href="/auth/google">sign in with google</a></div>
        <div><a href="/auth/logout">logout</a></div>
      </div>
    </React.Fragment>
  );
};
