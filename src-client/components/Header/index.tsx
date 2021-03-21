import * as React from 'react';
import { connect } from 'react-redux';

const Header = (props: any) => {
  console.log(process.env.NODE_ENV)
  return (
    <React.Fragment>
      <div style={{border: '1px solid black'}}>
        <h1>
          sup
        </h1>
        {
        props.auth ?
          <>
          <a href="/api">Backend API endsdfspoint.</a>
          <a href="/auth/logout">logout</a>
        </>
        :
        <>
          <a href="/auth/google">sign in with google</a>
        </>
        }
      </div>
    </React.Fragment>
  );
};

function mapStateToProps(state: any) {
  return {
    auth: state.auth
  };
}

// connect to the redux store ?
// from the redux store, map the auth object to our props so we can use it within this function
export default connect(mapStateToProps)(Header);
