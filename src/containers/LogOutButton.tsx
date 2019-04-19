import React from 'react';
import {navigate} from '@reach/router';
import {ApolloConsumer} from 'react-apollo';

const LogOutButton = () => {
  return (
    <ApolloConsumer>
      {client => (
        <div
          onClick={() => {
            client.writeData({data: {isLoggedIn: false}});
            localStorage.clear();
            navigate('/');
          }}
        >
          Log Out
        </div>
      )}
    </ApolloConsumer>
  );
};

export default LogOutButton;
