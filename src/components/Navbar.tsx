import React from 'react';
import styled from 'styled-components/macro';

const Navbar = () => {
  return (
    <NavbarWrapper>
      <OpenTimes>
        <Dot /> Open - Accepting Orders
      </OpenTimes>
      <RestaurantInfo>
        <RestaurantName>
          <p>BIFF'S JACK SHACK</p>
          <p>Biff Burrows</p>
        </RestaurantName>
        <Avatar />
      </RestaurantInfo>
    </NavbarWrapper>
  );
};

/* Export
============================================================================= */
export default Navbar;

/* Styled Components
============================================================================= */
const NavbarWrapper = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: calc(100% - 370px);
  padding: 0 20px;
  background: var(--alabaster);
  opacity: 0.98;
`;

const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background: green;
  margin-right: 5px;
`;

const OpenTimes = styled.div`
  display: flex;
  align-items: center;
`;

const RestaurantInfo = styled.div`
  display: flex;
  align-items: center;
`;

const RestaurantName = styled.div`
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: var(--osloGrey);
`;
