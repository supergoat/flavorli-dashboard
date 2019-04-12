import React from 'react';
import {RouteComponentProps} from '@reach/router';

interface Props extends RouteComponentProps {}
const Home = (_: Props) => {
  return <div>Hello</div>;
};

export default Home;
