import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import styled from 'styled-components/macro';

import Colours from '../Colours';

const Options = ({filter}: {filter: string}) => {
  return (
    <Query query={GET_OPTIONS}>
      {({loading, error, data: {getOptions}}: any) => {
        if (loading) return <OptionsWrapper>Loading...</OptionsWrapper>;
        if (error)
          return <OptionsWrapper>Error! {error.message}</OptionsWrapper>;

        const options = getOptions.filter((option: any) =>
          option.name.toLowerCase().includes(filter.toLowerCase()),
        );

        return (
          <OptionsWrapper>
            {options.map((option: any) => {
              return <OptionItem>{option.name}</OptionItem>;
            })}
          </OptionsWrapper>
        );
      }}
    </Query>
  );
};

export default Options;

const GET_OPTIONS = gql`
  query getOptions {
    getOptions {
      id
      name
      min
      max
      items {
        id
        price
        name
      }
    }
  }
`;

const OptionsWrapper = styled.div`
  margin-top: 15px;
  border-radius: 3px;
  background: ${Colours.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  max-height: 210px;
  padding: 5px;
  overflow: auto;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  cursor: pointer;
  border-radius: 3px;
  font-weight: bold;

  &:hover {
    background: ${Colours.alabaster};
  }
`;
