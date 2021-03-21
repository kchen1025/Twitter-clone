import * as React from 'react';
import {useEffect} from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import * as actions from '../../actions';

import Header from '../../components/Header';

const Landing = () => <div>Landing</div>;

// the 'exact' property is there because react-router by default will try to match all the properties that match the current url,
// which will include the / route

const App = (props: any) => {
  useEffect(() => {
    props.fetchUser();
  }, [])

  return (
    <React.Fragment>
      <BrowserRouter>
        <div>
          <Header/>
          <Route exact={true} path="/" component={Landing}/>
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default connect(null, actions)(App);
