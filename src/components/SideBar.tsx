import React from 'react';
import styled from 'styled-components/macro';
import {navigate} from '@reach/router';
import Colours from '../Colours';

const SideBar = ({children}: {children?: any}) => {
  return (
    <SidebarContainer>
      <SideBarWrapper>
        <Title onClick={() => navigate('/order')}>
          flavorli
          <span>BETA</span>
        </Title>

        {children}
      </SideBarWrapper>
    </SidebarContainer>
  );
};

/* Export
============================================================================= */
export default SideBar;

/* Styled Components
============================================================================= */
const SidebarContainer = styled.div`
  width: 370px;
`;

const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 370px;
  border-right: 1px solid var(--gallery);
  background: var(--white);
`;

const Title = styled.div`
  text-align: center;
  font-family: Pacifico;
  font-size: 24px;
  justify-content: center;
  cursor: default;
  padding: 30px 0 10px;

  span {
    font-weight: bold;
    color: ${Colours.oxfordBlue};
    font-size: 14px;
    margin-left: 5px;
  }
`;
